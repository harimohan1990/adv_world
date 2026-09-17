import pytest
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_register_user(client: AsyncClient):
    response = await client.post(
        "/api/v1/auth/register",
        json={
            "email": "test@example.com",
            "password": "strongpassword",
            "full_name": "Test User",
            "role": "advertiser"
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "test@example.com"
    assert data["role"] == "advertiser"
    assert "id" in data

@pytest.mark.asyncio
async def test_register_duplicate_user(client: AsyncClient):
    user_data = {
        "email": "duplicate@example.com",
        "password": "strongpassword",
        "full_name": "Test User",
        "role": "advertiser"
    }
    
    # Register first time
    response1 = await client.post("/api/v1/auth/register", json=user_data)
    assert response1.status_code == 200
    
    # Register second time
    response2 = await client.post("/api/v1/auth/register", json=user_data)
    assert response2.status_code == 400
    assert response2.json()["detail"] == "Email already registered"

@pytest.mark.asyncio
async def test_login_user(client: AsyncClient):
    # Setup: Create a user
    await client.post(
        "/api/v1/auth/register",
        json={
            "email": "login@example.com",
            "password": "strongpassword",
            "full_name": "Test User",
            "role": "advertiser"
        },
    )
    
    # Act: Login
    response = await client.post(
        "/api/v1/auth/login",
        data={
            "username": "login@example.com",
            "password": "strongpassword",
        },
    )
    
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"
