package indp.nbarthen.proj.admin;



import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Vector;

import org.springframework.web.multipart.MultipartFile;

import indp.nbarthen.proj.repository.Item;
import indp.nbarthen.proj.repository.Topping;

//Takes the image passed and saves it to the proper directory 
public class SaveItemImage {
	public static boolean saveImage(Item item, MultipartFile jpgFile) {
		
		String fileName =  item.getItemName().toLowerCase();
	    String directoryPath = "/images/items/" + item.getCategory().toLowerCase() + "/" ;
	    String filePath = directoryPath + "/" + fileName;
	    File directory = new File(directoryPath);

	    try {
	        // create the directory if it does not exist
	        if (!directory.exists()) {
	            directory.mkdirs();
	        }
	        
	        // delete the file if it already exists
	        File file = new File(filePath);
	        if (file.exists()) {
	            file.delete();
	        }
	        
	        // save the file
	        jpgFile.transferTo(file);
	        return true;
	        
	    } catch (IOException e) {
	        e.printStackTrace();
	        //Error saving file.
	        return false;
	    }
	
	    
	}
	



	    
}
