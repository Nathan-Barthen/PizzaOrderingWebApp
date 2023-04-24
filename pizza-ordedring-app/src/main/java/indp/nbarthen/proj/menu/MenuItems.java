package indp.nbarthen.proj.menu;



import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Vector;

import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import indp.nbarthen.proj.repository.Item;
import indp.nbarthen.proj.repository.Topping;

//Gets all of the Item from the database (MenuItems.json)
public class MenuItems {
	public static List<Item> getMenuItemsList() {
		
			String menuFileLocation = "src/main/resources/MenuItems.json";
			List<Item> items = new ArrayList<>();
			
	        // Load existing items from file
	        File file = new File(menuFileLocation);
	        if (file.exists()) {
	            try {
	                ObjectMapper objectMapper = new ObjectMapper();
	                items = objectMapper.readValue(file, new TypeReference<List<Item>>() {});
	            } catch (IOException e) {
	                e.printStackTrace();
	                System.out.println("Failed to read Items from MenuItems.json");
	                return items;
	            }
	        }

		    return items; 

		   
    }
	
	



	    
}
