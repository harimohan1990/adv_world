import pytest
from httpx import AsyncClient

@pytest.fixture
def auth_headers():
    # Helper to generate headers with token, though we will login in the test
    pass

@pytest.mark.asyncio
async def test_create_company(client: AsyncClient):
    # 1. Register user
    await client.post(
        "/api/v1/auth/register",
        json={
            "email": "company_owner@example.com",
            "password": "password",
            "full_name": "Test User",
            "role": "advertiser"
        },
    )
    
    # 2. Login to get token
    login_res = await client.post(
        "/api/v1/auth/login",
        data={
            "username": "company_owner@example.com",
            "password": "password",
        },
    )
    token = login_res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    
    # 3. Create company
    company_res = await client.post(
        "/api/v1/companies/",
        json={
            "name": "Test Company",
            "description": "A company for testing",
            "website": "https://example.com"
        },
        headers=headers
    )
    
    assert company_res.status_code == 201
    data = company_res.json()
    assert data["name"] == "Test Company"
    assert data["is_approved"] is False

@pytest.mark.asyncio
async def test_cannot_create_duplicate_company(client: AsyncClient):
    # 1. Register & Login
    await client.post(
        "/api/v1/auth/register",
        json={
            "email": "duplicate_company@example.com",
            "password": "password",
            "full_name": "Test User",
            "role": "advertiser"
        },
    )
    
    login_res = await client.post(
        "/api/v1/auth/login",
        data={"username": "duplicate_company@example.com", "password": "password"},
    )
    headers = {"Authorization": f"Bearer {login_res.json()['access_token']}"}
    
    # 2. Create first company
    await client.post(
        "/api/v1/companies/",
        json={"name": "First Company"},
        headers=headers
    )
    
    # 3. Attempt second company
    company_res2 = await client.post(
        "/api/v1/companies/",
        json={"name": "Second Company"},
        headers=headers
    )
    
    assert company_res2.status_code == 400
    assert company_res2.json()["detail"] == "User already owns a company"
