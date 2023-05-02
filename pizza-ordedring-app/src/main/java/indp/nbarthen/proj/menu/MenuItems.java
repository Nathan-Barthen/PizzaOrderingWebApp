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
	//Gets the list of items from the menu database file.
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
	
	
	//Used for itemPage.html. Gets the specified item to display.
	public static Item getItemFromMenu(String itemName, String categoryName) {
		
		String menuFileLocation = "src/main/resources/MenuItems.json";
		
		Item item = new Item();
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
                return item;
            }
            
            //Get the specific item matching name and category
            for(Item i : items) {
            	if(i.getItemName().equals(itemName) && i.getCategory().equals(categoryName)) {
            		item = i;
            	}
            }
            
        }

	    return item; 

	   
	}
	
public static boolean removeItemFromMenu(String itemName, String categoryName) {
		
		String menuFileLocation = "src/main/resources/MenuItems.json";
		
		List<Item> items = getMenuItemsList();
		// Find the item matching name and category and remove it from the list
	    items.removeIf(i -> i.getItemName().equals(itemName) && i.getCategory().equals(categoryName));

	    // Write the updated list back to the file
	    try {
	        ObjectMapper objectMapper = new ObjectMapper();
	        objectMapper.writeValue(new File(menuFileLocation), items);
	    } catch (IOException e) {
	        e.printStackTrace();
	        System.out.println("Failed to write Items to MenuItems.json when trying to delete: " + itemName);
	        return false;
	    }

	    return true; 

	   
	}



	    
}
