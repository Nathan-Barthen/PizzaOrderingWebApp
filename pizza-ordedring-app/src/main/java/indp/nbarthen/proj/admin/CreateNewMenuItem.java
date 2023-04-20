package indp.nbarthen.proj.admin;



import java.util.Arrays;
import java.util.List;
import java.util.Vector;

import org.springframework.web.multipart.MultipartFile;

import indp.nbarthen.proj.repository.Item;
import indp.nbarthen.proj.repository.Topping;


public class CreateNewMenuItem {
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
		
		if(jpgFile != null) {
			item.setHasImage(true);
		}
		else {
			item.setHasImage(false);
		}
		
		//Check if main topping(s) exist. Add toppings to item.
		if(mainToppingsName[0] != null || mainToppingsName[0] != "") {
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
		if(addonToppingsName[0] != null || addonToppingsName[0] != "") {
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
	



	    
}
