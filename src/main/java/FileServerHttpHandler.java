

import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.logging.Logger;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

public class FileServerHttpHandler implements HttpHandler {    
        String path = null;
        Logger logger;

        public FileServerHttpHandler(String path, Logger logger) {
            this.path = path;
            this.logger = logger;
        }

        @Override
        public void handle(HttpExchange t) throws IOException {
            String response = Files.readString(Paths.get(this.path + t.getRequestURI()));
            String encoding = "UTF-8";
            logger.info("Retrieving File " + this.path + t.getRequestURI());
            t.getResponseHeaders().set("Content-Type", "application/json; charset=" + encoding);
            t.getResponseHeaders().set("Accept-Ranges", "bytes");
            t.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
            t.sendResponseHeaders(200, response.length());
            OutputStream os = t.getResponseBody();
            os.write(response.getBytes("UTF-8"));
            os.close();
        }


    }