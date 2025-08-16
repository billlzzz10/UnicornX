"""
Compatibility wrapper: import the unified `app` from `main_complete.py`.

This keeps backwards compatibility for `python main.py` while using the
single canonical application defined in `main_complete.py`.
"""

from pathlib import Path
import uvicorn

# Ensure imports work when executed from package root
from main_complete import app


if __name__ == "__main__":
    # Run the unified app
    uvicorn.run("main_complete:app", host="0.0.0.0", port=8000, reload=True, log_level="info")
