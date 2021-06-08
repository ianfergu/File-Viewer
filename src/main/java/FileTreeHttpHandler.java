

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.logging.Logger;
import java.util.ArrayList;
import java.util.List;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import org.apache.commons.io.FileUtils;

import com.google.gson.*;


public class FileTreeHttpHandler implements HttpHandler{
    String rootPath = null;
    Logger logger;

    public FileTreeHttpHandler(String rootPath, Logger logger) {
        this.rootPath = rootPath;
        this.logger = logger;
    }

    @Override
    public void handle(HttpExchange t) throws IOException {
        Path root = Paths.get(this.rootPath);
        List<File> files = (List<File>) FileUtils.listFiles(new File(this.rootPath), null, true);
        
        List<String> paths = new ArrayList<String>();
        for (File file: files) {
            paths.add("/" + root.relativize(file.toPath()).toString());
        }

        logger.info("Retrieving File Tree from" + t.getRemoteAddress());
        String response = new Gson().toJson(paths);
        String encoding = "UTF-8";
        t.getResponseHeaders().set("Content-Type", "application/json; charset=" + encoding);
        t.getResponseHeaders().set("Accept-Ranges", "bytes");
        t.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        t.sendResponseHeaders(200, response.length());
        OutputStream os = t.getResponseBody();
        os.write(response.getBytes("UTF-8"));
        os.close();
    }
}
