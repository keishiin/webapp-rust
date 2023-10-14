use axum::{
    http::{HeaderMap, Request, StatusCode},
    middleware::Next,
    response::Response,
};
use tower_cookies::Cookies;

use crate::utils::errors::ApiError;
use tower_sessions::Session;

pub async fn _require_auth<T>(
    session: Session,
    cookies: Cookies,
    headers: HeaderMap,
    request: Request<T>,
    next: Next<T>,
) -> Result<Response, ApiError> {
    let header_token = if let Some(token) = headers.get("x-auth-token") {
        token.to_str().map_err(|error| {
            eprintln!("Error extracting token from headers: {:?}", error);
            ApiError::new(StatusCode::INTERNAL_SERVER_ERROR, "Error reading token")
        })?
    } else {
        return Err(ApiError::new(
            StatusCode::UNAUTHORIZED,
            "not authenticated!",
        ));
    };

    let _ = session.get::<String>(&header_token).map_err(|error| {
        eprintln!("Session not found: {:?}", error);
        ApiError::new(StatusCode::UNAUTHORIZED, "not authenticated/session get failed!")
    });

    let _cookie = cookies.get("name");

    Ok(next.run(request).await)
}
