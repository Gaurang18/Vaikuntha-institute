"""
Main FastAPI application for the Vaikuntha Institute Learning Platform
"""

import os
from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import time
from typing import List, Optional
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Import API routes
from api.routes import router as api_router

# Create FastAPI app
app = FastAPI(
    title="Vaikuntha Institute API",
    description="API for the Vaikuntha Institute online learning platform",
    version="1.0.0",
)

# Configure CORS
origins = [
    "http://localhost:3000",
    "https://vaikunthainstitute.com",
    # Add other allowed origins as needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add middleware for request timing
@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy", "version": "1.0.0"}

# Include API routes
app.include_router(api_router, prefix="/api/v1")

# Add global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    # In a production app, you'd want to log the exception here
    return JSONResponse(
        status_code=500,
        content={"message": "An unexpected error occurred", "detail": str(exc)},
    )

if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", "8000")),
        reload=True,
    )