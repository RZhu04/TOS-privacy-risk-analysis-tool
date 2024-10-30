from waitress import serve
from main import app
import logging
from paste.translogger import TransLogger

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger('waitress')
handler = logging.FileHandler('server.log')
handler.setLevel(logging.INFO)
logger.addHandler(handler)

def serve_app():
    try:
        print("Starting server...")
        serve(
            TransLogger(app),
            host='0.0.0.0',
            port=5000,
            threads=4,            # Reduced number of threads
            connection_limit=200, # Reduced connection limit
            channel_timeout=60,   # Reduced timeout
            cleanup_interval=30,
            ident='TOS Privacy Analysis Tool',
            max_request_body_size=1024 * 1024 * 16  # 16MB
        )
    except Exception as e:
        logger.error(f"Server crashed: {e}")
        print(f"Server crashed: {e}")

if __name__ == "__main__":
    serve_app() 