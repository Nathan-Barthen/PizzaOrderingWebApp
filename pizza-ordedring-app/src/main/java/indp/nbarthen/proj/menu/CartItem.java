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

//Take item and parameters passed. Makes it ready to be added to a users cart.
public class CartItem {
	/* Takes item and parameters from itemPage.html
	 * Goes throught item toppings, sets variables to users specifications.
	 * 		Includes:
	 *        Included Toppings:
	 * 			dropdown selection (ex. type of sauce)
	 * 			dropdown amount (light normal extra)
	 * 
	 * 			non-dropdown amount (light normal extra Or 'None' [topping removed])
	 * 			non-dropdown sideOfPizza (left whole right Or 'Not Pizza')
	 * 
	 * 		  Add-on Toppings:
	 *          -Checks if topping was added.
	 * 			 dropdown selection (ex. type of sauce)
	 * 			 dropdown amount (light normal extra Or 'None' [topping removed])
	 * 
	 * 			 non-dropdown amount (light normal extra Or 'None' [topping removed])
	 * 			 non-dropdown sideOfPizza (left whole right Or 'Not Pizza')
	 */
	public static Item generateItemForCart(Item item, String customInstructions,
			String[] mainDropNames, String[] mainDropSelected, String[] mainDropAmounts,
			String[] mainLNENames, String[] mainLNESideOfPizza, String[] mainLNEAmounts,
			String[] addonDropNames, String[] addonDropSelected, String[] addonDropAmounts,
			String[] addonLNENames, String[] addonLNESideOfPizza, String[] addonLNEAmounts
			) {
			Item cartItem = item;
			System.out.println(customInstructions);
			cartItem.setItemAdditionalInstructions(customInstructions);
			
			//Loop through included toppings.
			for(Topping topp : cartItem.getIncludedToppings()) {
				
				//If topping is a type dropdown
				if(topp.getToppingType().contains("dropdown")) {
					//Loop through passed dropdownNames array.
					for(int i=0; i < mainDropNames.length; i++) {
						//If name matches current toopping.
						if(mainDropNames[i].contains(topp.getToppingName())) {
							//Set values.
							topp.setSelectedOption(mainDropSelected[i]);
							topp.setSelectedAmount(mainDropAmounts[i]);
						}
					}
					
					
				}
				else {
				  //If topping is a type default
					for(int i=0; i < mainLNENames.length; i++) {
						//If name matches current toopping.
						if(mainLNENames[i].contains(topp.getToppingName())) {
							//Set values.
							topp.setSelectedOption(mainLNEAmounts[i]);
							topp.setSideOfPizza(mainLNESideOfPizza[i]);
						}
					}
					
					
				}
			}
			
			
			
			
			//Loop through add-on toppings.
			for(Topping topp : cartItem.getAdditionalToppings()) {
				
				//If topping is a type dropdown
				if(topp.getToppingType().contains("dropdown")) {
					//Loop through passed dropdownNames array.
					for(int i=0; i < addonDropNames.length; i++) {
						//If name matches current toopping.
						if(addonDropNames[i].contains(topp.getToppingName())) {
							//Set values.
							topp.setSelectedOption(addonDropSelected[i]);
							topp.setSelectedAmount(addonDropAmounts[i]);
						}
					}
					
					
				}
				else {
				  //If topping is a type default
					for(int i=0; i < addonLNENames.length; i++) {
						//If name matches current toopping.
						if(addonLNENames[i].contains(topp.getToppingName())) {
							//Set values.
							topp.setSelectedOption(addonLNEAmounts[i]);
							topp.setSideOfPizza(addonLNESideOfPizza[i]);
						}
					}
					
					
				}
			}
			

		    return cartItem; 

		   
    }
	
	
	//Looks at toppings and add-ons to generate the final price based on users specifications.
		//Done by setting itemAdditonalCost. Final cost can be determined by adding itemDefaultCost + itemAdditonalCost
	public static Item getFinalPrice(Item item) {
		Item cartItem = item;
		
		double additionalCost = 0;
		
		//iterate over included toppings.
		for(Topping topp : cartItem.getIncludedToppings()) {
			if(topp.getSelectedAmount().contains("Extra")) {
				//Add cost if extra was selected.
				additionalCost += topp.getAdditionalCostExtra();
			}
		}
		
		//iterate over add-on toppings.
		for(Topping topp : cartItem.getAdditionalToppings()) {
			//If add-on topping was selected / included.
			if(!topp.getSelectedAmount().contains("None")) {
				//Add cost of including add-on
				additionalCost += topp.getAdditionalCostAddon();
				if(topp.getSelectedAmount().contains("Extra")) {
					//Add cost if extra was selected.
					additionalCost += topp.getAdditionalCostExtra();
				}
			}
		}
		
		//Item total cost is calculated by adding (itemDefaultCost + itemAdditionalCost )
		cartItem.setItemAdditionalCost(additionalCost);
		
		return cartItem;
	}
	


	    
}
