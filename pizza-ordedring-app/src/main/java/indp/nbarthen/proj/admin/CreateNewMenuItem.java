package indp.nbarthen.proj.admin;



import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.Vector;

import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.type.TypeFactory;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


import indp.nbarthen.proj.repository.Item;
import indp.nbarthen.proj.repository.Topping;


public class CreateNewMenuItem {
	
	 
	
	//Create the actual Item class using parameters
	public static Item CreateItem(List<String> itemCategories, String itemName, String categoryName, String itemPrice, String itemDescription,
            String[] mainToppingsName, String[] mainToppingsType, String[] mainToppingsTypes,
            String[] mainToppingsIsPizza, String[] mainToppingsExtra, String[] addonToppingsName,
            String[] addonToppingsType, String[] addonToppingsTypes, String[] addonToppingsIsPizza,
            String[] addonToppingsExtra, String[] addonToppingsPrice, MultipartFile jpgFile) 
	{
		
		Item item = new Item();
		
		
		//CHANGE. Check if item in database already has same name in same category. If so return null. 
		
		
		item.setItemName(itemName);
		
		//Checks if category exists, if not it is placed in 'Misc'.
		if(itemCategories.contains(categoryName)) {
			item.setCategory(categoryName);
		}
		else {
			item.setCategory("Misc");
		}
		
		//Remove "$" from price, if it exists.
		if(itemPrice.contains("$")) {
			itemPrice = itemPrice.replace("$", "");
		}
		item.setItemDefaultCost(Double.parseDouble(itemPrice));
		
		item.setItemDesc(itemDescription);
		
		if(jpgFile != null && !jpgFile.isEmpty()) {
			item.setHasImage(true);
		}
		else {
			item.setHasImage(false);
		}
		
		//Check if main topping(s) exist. Add toppings to item.
		if(mainToppingsName != null) {
			List<Topping> includedToppings = new Vector<Topping>();
			for(int i = 0; i < mainToppingsName.length; i ++) {
				Topping topping = new Topping();
				
				//Set Name
				topping.setToppingName(mainToppingsName[i]);
				//Set Type ('default' or 'dropdown')
				topping.setToppingType(mainToppingsType[i]);
				//Set isPizza to true of false (mainToppingsIsPizza[i] = "Yes" or "No")
				if(mainToppingsIsPizza[i].toLowerCase().contains("yes")) {
					topping.setIsPizza(true);
				}
				else {
					topping.setIsPizza(false);
				}
				
				//Set Extra cost.
				if(mainToppingsExtra[i].contains("$")) {
					//Remove "$" from price, if it exists.
					mainToppingsExtra[i] = mainToppingsExtra[i].replace("$", "");
				}
				topping.setAdditionalCostExtra(Double.parseDouble(mainToppingsExtra[i]));
				
				//Set types if ToppingType = dropdown.
				if(topping.getToppingType().contains("dropdown")) {
					String[] splitUpList = mainToppingsTypes[i].split(",");
					//Remove leading and trailing spaces
					for (int j = 0; j < splitUpList.length; j++) {
					    splitUpList[j] = splitUpList[j].trim();
					}
					//Save splitUpList to topping
					topping.setToppingOptions(Arrays.asList(splitUpList));
				}
				
				//Set isAddon to false
				topping.setIsAddon(false);
				
				includedToppings.add(topping);
			}
			
			item.setIncludedToppings(includedToppings);
		}
		
		//Check if addon topping(s) exist. Add toppings to item.
		if(addonToppingsName != null) {
			List<Topping> addonToppings = new Vector<Topping>();
			for(int i = 0; i < addonToppingsName.length; i ++) {
				Topping topping = new Topping();
				
				//Set Name
				topping.setToppingName(addonToppingsName[i]);
				//Set Type ('default' or 'dropdown')
				topping.setToppingType(addonToppingsType[i]);
				//Set isPizza to true of false (mainToppingsIsPizza[i] = "Yes" or "No")
				if(addonToppingsIsPizza[i].toLowerCase().contains("yes")) {
					topping.setIsPizza(true);
				}
				else {
					topping.setIsPizza(false);
				}
				
				//Set Extra cost.
				if(addonToppingsExtra[i].contains("$")) {
					//Remove "$" from price, if it exists.
					addonToppingsExtra[i] = addonToppingsExtra[i].replace("$", "");
				}
				topping.setAdditionalCostExtra(Double.parseDouble(addonToppingsExtra[i]));
				
				//Set Addon cost.
				if(addonToppingsPrice[i].contains("$")) {
					//Remove "$" from price, if it exists.
					addonToppingsPrice[i] = addonToppingsPrice[i].replace("$", "");
				}
				topping.setAdditionalCostAddon(Double.parseDouble(addonToppingsPrice[i]));
				
				//Set types if ToppingType = dropdown.
				if(topping.getToppingType().contains("dropdown")) {
					String[] splitUpList = addonToppingsTypes[i].split(",");
					//Remove leading and trailing spaces
					for (int j = 0; j < splitUpList.length; j++) {
					    splitUpList[j] = splitUpList[j].trim();
					}
					//Save splitUpList to topping
					topping.setToppingOptions(Arrays.asList(splitUpList));
				}
				
				//Set isAddon to false
				topping.setIsAddon(true);
				
				addonToppings.add(topping);
			}
			
			item.setAdditionalToppings(addonToppings);
		}
		
		
		//Retuen completed item.
		return item;
	}
	

	/* Adds the item to MenuItems database. Returns true.
	 * 	If MenuItems does not exist, it will create the file.
	 * 	If the item already exists in the database, it will not add the item and returns false.
	 *      oldItemHasImage - used when editing an item. If creating a new item, will be set to false
	 */
		
	public static boolean addItemToDatabase(Item item, MultipartFile jpgFile, boolean oldItemHasImage, String oldItemName) {
		String menuFileLocation = "src/main/resources/MenuItems.json";
		List<Item> items = new ArrayList<>();
		
		try {
	        // Load existing items from file
	        File file = new File(menuFileLocation);
	        if (file.exists()) {
	            try {
	                ObjectMapper objectMapper = new ObjectMapper();
	                items = objectMapper.readValue(file, new TypeReference<List<Item>>() {});
	            } catch (IOException e) {
	                e.printStackTrace();
	                System.out.println("Failed to read Items from MenuItems.json");
	                return false;
	            }
	        }

	        // Check if item already exists
	        for (Item i : items) {
	        	// Item already exists
	            if (	i.getItemName().toLowerCase().equals(item.getItemName().toLowerCase()) 
	            	&& 	i.getCategory().toLowerCase().equals(item.getCategory().toLowerCase())) {
	            	System.out.println("Item already exsist in MenuItems.json");
	                return false; 
	            }
	        }
	        
	        
	        //Save image. 
	        //If image exists... save
	        if(item.getHasImage()) {
				//Save image to database, rename image to item name.
		 		if(SaveItemImage.saveImage(item, jpgFile)) {
		 			//Save image url
		 			item.setImageUrl("/images/items/" + item.getCategory().toLowerCase() + "/" + item.getItemName().toLowerCase() + ".jpg");
		 		}
		 		//Save image failed. 
		 		else {
		 			//Image did not save. Set to default image url.
		 			item.setImageUrl("/images/items/noImageAvailable.jpg");
		 		}
		 		
			}
		 	//No images was passed for edit
		 	else {
		 		//No image passed, but image for item already exists and name is the same (item was edited).
			 	if (oldItemHasImage && oldItemName.equals(item.getItemName())) {
			 	    //Old image file exists
			 		//Item was not renamed. Old image can be used.
			 		item.setImageUrl("/images/items/" + item.getCategory().toLowerCase() + "/" + item.getItemName().toLowerCase() + ".jpg");
			 		
			 	}
			 	else {
			 		//No image passed / Item does not have a prev image.
			 		item.setImageUrl("/images/items/noImageAvailable.jpg");
			 	}
		 	}
		 	
		 	
	        // Add item to list and save to file
	        items.add(item);
	        ObjectMapper objectMapper = new ObjectMapper();
	        objectMapper.writeValue(new File(menuFileLocation), items);

	        return true; // Item saved successfully

	    } catch (IOException e) {
	        e.printStackTrace();
	        System.out.println("Error adding item to MenuItems.json");
	        return false; // Error saving item
	    }
		
	}

	    
	


	    
}
