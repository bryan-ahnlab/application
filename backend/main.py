from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import timedelta
from typing import List

from database import engine, get_db
from models import Base
from schemas import User, UserCreate, Post, PostCreate, Token
from crud import (
    get_users,
    create_user,
    get_user,
    get_user_by_email,
    get_posts,
    create_post,
    get_post,
    get_posts_by_author,
    update_post,
    delete_post,
)
from auth import (
    authenticate_user,
    create_access_token,
    get_current_active_user,
)
from config import settings

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="FastAPI Backend",
    description="A FastAPI backend with MySQL database",
    version="1.0.0",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Welcome to FastAPI Backend!"}


@app.get("/health")
async def health_check():
    return {"status": "healthy"}


# Authentication endpoints
@app.post("/token", response_model=Token)
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)
):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=settings.access_token_expire_minutes)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


# User endpoints
@app.post("/users/", response_model=User)
def create_new_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return create_user(db=db, user=user)


@app.get("/users/me/", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user


@app.get("/users/", response_model=List[User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = get_users(db, skip=skip, limit=limit)
    return users


@app.get("/users/{user_id}", response_model=User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


# Post endpoints
@app.post("/posts/", response_model=Post)
def create_new_post(
    post: PostCreate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db),
):
    return create_post(db=db, post=post, author_id=current_user.id)


@app.get("/posts/", response_model=List[Post])
def read_posts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    posts = get_posts(db, skip=skip, limit=limit)
    return posts


@app.get("/posts/{post_id}", response_model=Post)
def read_post(post_id: int, db: Session = Depends(get_db)):
    db_post = get_post(db, post_id=post_id)
    if db_post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    return db_post


@app.get("/users/{user_id}/posts/", response_model=List[Post])
def read_user_posts(
    user_id: int, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)
):
    posts = get_posts_by_author(db, author_id=user_id, skip=skip, limit=limit)
    return posts


@app.put("/posts/{post_id}", response_model=Post)
def update_post_endpoint(
    post_id: int,
    post: PostCreate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db),
):
    db_post = get_post(db, post_id=post_id)
    if db_post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    if db_post.author_id != current_user.id:
        raise HTTPException(
            status_code=403, detail="Not authorized to update this post"
        )

    return update_post(db=db, post_id=post_id, post=post)


@app.delete("/posts/{post_id}")
def delete_post_endpoint(
    post_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db),
):
    db_post = get_post(db, post_id=post_id)
    if db_post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    if db_post.author_id != current_user.id:
        raise HTTPException(
            status_code=403, detail="Not authorized to delete this post"
        )

    delete_post(db=db, post_id=post_id)
    return {"message": "Post deleted successfully"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host=settings.host, port=settings.port)
