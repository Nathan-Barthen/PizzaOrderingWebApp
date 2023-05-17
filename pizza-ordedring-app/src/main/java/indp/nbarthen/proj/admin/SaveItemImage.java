package indp.nbarthen.proj.admin;



import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Arrays;
import java.util.List;
import java.util.Vector;

import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.web.multipart.MultipartFile;

import indp.nbarthen.proj.repository.Item;
import indp.nbarthen.proj.repository.Topping;

//Takes the image passed and saves it to the proper directory 
public class SaveItemImage {
	public static boolean saveImage(Item item, MultipartFile jpgFile) {
		String fileName = item.getItemName().toLowerCase();
        String directoryPath = "src/main/resources/static/images/items/" + item.getCategory().toLowerCase() + "/";
        String filePath = directoryPath + fileName + ".jpg";
        File directory = new File(directoryPath);
        
        try {
            // delete the file if it already exists
            File file = new File(filePath);
            if (file.exists()) {
                file.delete();
            }

            // create a new file
            file.createNewFile();

            // write the contents of the multipart file to the new file
            FileOutputStream outputStream = new FileOutputStream(file);
            outputStream.write(jpgFile.getBytes());
            outputStream.close();

            
            return true;
            
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("Error saving item image.");
            return false;
        }
        
        
    }
	
	
	
	



	    
}
