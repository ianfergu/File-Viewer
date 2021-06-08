

import com.sun.net.httpserver.HttpServer;
import java.net.InetSocketAddress;
import java.util.logging.Logger;
import com.sun.net.httpserver.HttpHandler;

public class FileServer implements Runnable {

    private static FileServer fileServer;
    private HttpServer httpServer;
	private static String path;
    private Logger logger;

    public static void main(String[] args) {
        if (args.length == 0) {
			System.out.println("Usage: java -jar <jar name> <path-to-host>");
			System.exit(0);
		}

        path = args[0];
        fileServer = new FileServer();

		Thread thread = new Thread(fileServer);
		thread.start();
        try {
            thread.join();
        } catch (InterruptedException e) {
            System.out.println(e);
        }
    }
    
    @Override
    public void run() {
        try {
            logger = Logger.getLogger("http");
            logger.info("Server is starting...");

            httpServer = HttpServer.create(new InetSocketAddress("localhost", 8080), 0);
            httpServer.createContext("/", getFile(path, logger));
            httpServer.createContext("/tree/", getFileTree(path, logger));
            httpServer.setExecutor(null);
            
            httpServer.start();
            logger.info(" Server started on port 8080");

        } catch (Exception e) {
            logger.severe("An error occured on run.");
        }
    }

    private static HttpHandler getFile(String path, Logger logger) {
        return new FileServerHttpHandler(path, logger);
    }

    private static HttpHandler getFileTree(String path, Logger logger) {
        return new FileTreeHttpHandler(path, logger);
    }
}

