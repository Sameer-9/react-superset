from flask import Flask, request, Response
from superset.config import *  # Import existing configurations

# Set the secret key for session management
SECRET_KEY = 'your-secret-key'

# Enable CORS
ENABLE_CORS = True
TALISMAN_ENABLED = False
HTTP_HEADERS={"X-Frame-Options":"ALLOWALL"} 

SUPERSET_WEBSERVER_DOMAINS = ["localhost"]
