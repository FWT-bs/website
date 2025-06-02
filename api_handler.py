from flask import Flask, request, jsonify, send_file, redirect
from flask_cors import CORS
import json
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

# File to store submissions
SUBMISSIONS_FILE = 'form_submissions.json'

@app.route('/')
def index():
    """Serve the main demo page"""
    return send_file('demo.html')

@app.route('/demo.html')
def demo():
    """Serve the demo page"""
    return send_file('demo.html')

@app.route('/index.html')
def main_index():
    """Serve the main index page"""
    return send_file('index.html')

@app.route('/chatbot-details.html')
def chatbot_details():
    """Serve the chatbot details page"""
    return send_file('chatbot-details.html')

@app.route('/chatbot.html')
def chatbot_demo():
    """Serve the chatbot demo page"""
    return send_file('chatbot.html')

@app.route('/pricing.html')
def pricing():
    """Serve the pricing page"""
    return send_file('pricing.html')

@app.route('/<path:filename>')
def serve_static(filename):
    """Serve static files like logo.png, images, etc."""
    if os.path.exists(filename):
        return send_file(filename)
    return "File not found", 404

def load_submissions():
    """Load existing submissions from file"""
    if os.path.exists(SUBMISSIONS_FILE):
        try:
            with open(SUBMISSIONS_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        except (json.JSONDecodeError, FileNotFoundError):
            return []
    return []

def save_submissions(submissions):
    """Save submissions to file"""
    try:
        with open(SUBMISSIONS_FILE, 'w', encoding='utf-8') as f:
            json.dump(submissions, f, indent=2, ensure_ascii=False)
        return True
    except Exception as e:
        print(f"Error saving submissions: {e}")
        return False

@app.route('/api/submit-demo', methods=['POST'])
def submit_demo():
    """Handle demo form submissions"""
    try:
        # Get form data
        data = request.get_json()
        
        # Add server timestamp
        data['server_timestamp'] = datetime.now().isoformat()
        data['ip_address'] = request.remote_addr
        
        # Load existing submissions
        submissions = load_submissions()
        
        # Add new submission
        submissions.append(data)
        
        # Save to file
        if save_submissions(submissions):
            print(f"New submission saved. Total submissions: {len(submissions)}")
            return jsonify({
                'success': True,
                'message': 'Submission saved successfully',
                'total_submissions': len(submissions)
            })
        else:
            return jsonify({
                'success': False,
                'message': 'Failed to save submission'
            }), 500
            
    except Exception as e:
        print(f"Error processing submission: {e}")
        return jsonify({
            'success': False,
            'message': 'Internal server error'
        }), 500

@app.route('/api/view-submissions', methods=['GET'])
def view_submissions():
    """View all submissions (admin endpoint)"""
    try:
        submissions = load_submissions()
        return jsonify({
            'success': True,
            'total': len(submissions),
            'submissions': submissions
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@app.route('/api/export-submissions', methods=['GET'])
def export_submissions():
    """Export submissions as CSV"""
    try:
        import csv
        import io
        
        submissions = load_submissions()
        
        if not submissions:
            return jsonify({'success': False, 'message': 'No submissions found'})
        
        # Create CSV content
        output = io.StringIO()
        writer = csv.writer(output)
        
        # Write header
        if submissions:
            headers = list(submissions[0].keys())
            writer.writerow(headers)
            
            # Write data
            for submission in submissions:
                writer.writerow([submission.get(header, '') for header in headers])
        
        # Return CSV as downloadable file
        csv_content = output.getvalue()
        output.close()
        
        return app.response_class(
            csv_content,
            mimetype='text/csv',
            headers={'Content-Disposition': 'attachment; filename=hotel_submissions.csv'}
        )
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

if __name__ == '__main__':
    print(f"Form submissions will be saved to: {os.path.abspath(SUBMISSIONS_FILE)}")
    print("API Endpoints:")
    print("- POST /api/submit-demo (submit form)")
    print("- GET /api/view-submissions (view all)")
    print("- GET /api/export-submissions (download CSV)")
    app.run(debug=True, port=5000) 