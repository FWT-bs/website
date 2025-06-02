import os
import http.server
import socketserver
from urllib.parse import urlsplit, urlunsplit

class PrettyURLRequestHandler(http.server.SimpleHTTPRequestHandler):
    def rewrite_path(self, original_path):
        """
        Given an original path (without query parameters), try to find a matching file:
         - If the path is root ("/"), return "/index.html"
         - If the file exists as given, return it.
         - Otherwise, if appending '.html' finds a file, return that.
         - Otherwise, if treating the URL as a directory (with a trailing slash) finds an index.html, return the directory path.
         - Otherwise, return the original path.
        """
        # Handle root path - serve index.html
        if original_path == '/':
            return '/index.html'
            
        # Check if the file exists as is
        if os.path.exists(self.translate_path(original_path)):
            return original_path

        # If not found and the URL doesn't end with a slash, try appending '.html'
        if not original_path.endswith('/'):
            candidate = original_path + '.html'
            if os.path.exists(self.translate_path(candidate)):
                return candidate

        # If still not found, try treating it as a directory and check for index.html
        # Append a trailing slash if needed
        if not original_path.endswith('/'):
            candidate = original_path + '/'
        else:
            candidate = original_path

        candidate_index = candidate + 'index.html'
        if os.path.exists(self.translate_path(candidate_index)):
            return candidate

        # Otherwise, leave the path unchanged
        return original_path

    def do_GET(self):
        # Parse the URL to separate the path from query parameters
        parsed = urlsplit(self.path)
        original_path = parsed.path

        # Rewrite the path if necessary (ignoring query parameters for the lookup)
        new_path = self.rewrite_path(original_path)
        if new_path != original_path:
            # Rebuild the URL with the new path but the original query and fragment
            parsed = parsed._replace(path=new_path)
            self.path = urlunsplit(parsed)
        return super().do_GET()

    def do_POST(self):
        # Read and discard the request body (if any)
        content_length = int(self.headers.get('Content-Length', 0))
        if content_length:
            self.rfile.read(content_length)
        # Process the request just like a GET, including URL rewriting
        return self.do_GET()

if __name__ == '__main__':
    PORT = 80  # Change to your preferred port
    Handler = PrettyURLRequestHandler

    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print("Serving at port", PORT)
        httpd.serve_forever()
