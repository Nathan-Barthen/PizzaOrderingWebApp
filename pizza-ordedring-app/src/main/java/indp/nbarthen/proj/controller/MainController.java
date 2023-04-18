package indp.nbarthen.proj.controller;



import indp.nbarthen.proj.repository.UserOrder;
import indp.nbarthen.proj.admin.CreateNewMenuItem;
import indp.nbarthen.proj.repository.Item;
import indp.nbarthen.proj.repository.OrdersRepository;
import indp.nbarthen.proj.repository.UserAccount;
import io.github.cdimascio.dotenv.Dotenv;

import java.io.IOException;
import java.util.*;


import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.ibm.icu.text.SimpleDateFormat;



@Controller
public class MainController {
	private OrdersRepository ordersRepository;
	private String userSearchPopupError;
	private List<String> itemCategories;
	
	public MainController(OrdersRepository  ordersRepository) {
		this.ordersRepository = ordersRepository;
		this.userSearchPopupError = "none";
		itemCategories = Arrays.asList( "Pizzas", "Sides", "Wings", "Pasta", "Wedgie", "Desserts", "Drinks", "Misc");
	}
	
	
	
	
	/* homePage.html
	 * 	This will be the home page
	 */
	 @RequestMapping({"/"})
	    public String homePage(Model model) {
		 
		 	
		 	//User was redirected to home from API call error.
		 	if(!userSearchPopupError.equals("none")) {
		 		String popupError = userSearchPopupError;
		 		userSearchPopupError = "none";
		 		//Display error message
		 		model.addAttribute("popupError", popupError);
		 		return "homePage";
		 	}
		 	
		 	//Default value for userSearchPopupError is 'none' (no error will popup)
		 	model.addAttribute("popupError", userSearchPopupError);
		 	
		 	
	        return "homePage";
	    }
	 
	 /* categoryPage.html
		 * 	Whenever the user clicks on one of the images at the home page, they will be directed to here.
		 * 		This will show all of the items for the given category.
	 */
	 @RequestMapping({"/pizzaStore/{categoryName}"})
	    public String categoryPage(@PathVariable("categoryName") String categoryName, Model model) {
		 
		 	
		 	//User was redirected to home from API call error.
		 	if(!userSearchPopupError.equals("none")) {
		 		String popupError = userSearchPopupError;
		 		userSearchPopupError = "none";
		 		//Display error message
		 		model.addAttribute("popupError", popupError);
		 		return "homePage";
		 	}
		 	
		 	//Default value for userSearchPopupError is 'none' (no error will popup)
		 	model.addAttribute("popupError", userSearchPopupError);
		 	
		 	
	        return "categoryPage";
	    }
	 
	 /* itemPage.html
		 * 	Whenever the user clicks on one of the images at the category page, they will be directed to here.
		 *  They can also be directed here by clicking it from the dropdown menu at the top of the page.
		 * 		This will show all of the options for a given item and allow them to add it to their cart.
	 */
	 @RequestMapping({"/pizzaStore/{categoryName}/{itenName}"})
	    public String itemPage(@PathVariable("categoryName") String categoryName, @PathVariable("itenName") String itemName, Model model) {
		 
		 	
		 	//User was redirected to home from API call error.
		 	if(!userSearchPopupError.equals("none")) {
		 		String popupError = userSearchPopupError;
		 		userSearchPopupError = "none";
		 		//Display error message
		 		model.addAttribute("popupError", popupError);
		 		return "homePage";
		 	}
		 	
		 	//Default value for userSearchPopupError is 'none' (no error will popup)
		 	model.addAttribute("popupError", userSearchPopupError);
		 	
		 	
	        return "itemPage";
	    }
	 
	 @RequestMapping({"/pizzaStore/checkout"})
	    public String checkoutPage(Model model) {
		 
		 	
		 	//User was redirected to home from API call error.
		 	if(!userSearchPopupError.equals("none")) {
		 		String popupError = userSearchPopupError;
		 		userSearchPopupError = "none";
		 		//Display error message
		 		model.addAttribute("popupError", popupError);
		 		return "homePage";
		 	}
		 	
		 	//Default value for userSearchPopupError is 'none' (no error will popup)
		 	model.addAttribute("popupError", userSearchPopupError);
		 	
		 	
	        return "checkoutPage";
	    }
	 
	 /* sign-inPage.html
		 * 	This will be used to allow the user login to their account.
	 */
	 @RequestMapping({"/pizzaStore/signin"})
	    public String signInPage(Model model) {
		 
		 	
		 	//User was redirected to home from API call error.
		 	if(!userSearchPopupError.equals("none")) {
		 		String popupError = userSearchPopupError;
		 		userSearchPopupError = "none";
		 		//Display error message
		 		model.addAttribute("popupError", popupError);
		 		return "homePage";
		 	}
		 	
		 	//Default value for userSearchPopupError is 'none' (no error will popup)
		 	model.addAttribute("popupError", userSearchPopupError);
		 	
		 	
	        return "sign-inPage";
	    }
	 /* sign-upPage.html
		 * 	This will be used to allow the user to create an account.
	*/
	 @RequestMapping({"/pizzaStore/signup"})
	    public String signUpPage(Model model) {
		 
		 	
		 	//User was redirected to home from API call error.
		 	if(!userSearchPopupError.equals("none")) {
		 		String popupError = userSearchPopupError;
		 		userSearchPopupError = "none";
		 		//Display error message
		 		model.addAttribute("popupError", popupError);
		 		return "homePage";
		 	}
		 	
		 	//Default value for userSearchPopupError is 'none' (no error will popup)
		 	model.addAttribute("popupError", userSearchPopupError);
		 	
		 	
	        return "sign-upPage";
	    }
	
	 @PostMapping("/signup")
	 public String signUp(@RequestParam("firstname") String firstName,
	                      @RequestParam("lastname") String lastName,
	                      @RequestParam("address") String address,
	                      @RequestParam("email") String email,
	                      @RequestParam("passwordHash") String passwordHash) {

	     // Create the UserAccount object with hashed password
	     UserAccount user = new UserAccount(firstName, lastName, address, email, passwordHash);

	     // Save the user account to your database
	     // ...

	     return "redirect:/";
	 }
	 
	 
	 
	//Admin Section
		 //Admin options page. Shows selectors to delete, add, edit items on the menu.
		 @RequestMapping({"/pizzaStore/admin/optionsPage"})
		 	public String adminOptionsPage(Model model, @RequestParam(name = "itemCreationError", required = false) String itemCreationError) {
			    
			 	if (itemCreationError != null) {
			 		//Error creating item
			        model.addAttribute("itemCreationError", itemCreationError);
			    }
			 
			 	//If user is admin, continue. Else redirect to home.
			 	
			 	
			 	
		        return "admin/adminOptionsPage";
		    }
	 //Admin - DeleteSection		 
		/*If user clicks 'Delete an Item' at the optionsPage, they will be redirected here.
		 *	This will list all of the item by category, 
		 * 	 and allow the user to click to view the item (and then delete it if they want)
		 */
			 @RequestMapping({"/pizzaStore/admin/delete/showAllItems"})
			    public String adminShowAllItemsDeletePage(Model model) {
				 
				 	//If user is admin, continue. Else redirect to home.
				 		//Show all items
				 	
				 	
			        return "admin/adminShowAllDeletePage";
			}
		 /*If user clicks on an item at the 'adminShowAllDeletePage.html' page
			 *	They will be redirected to here which will list the item and its description.
			 *		At this page the user will be able to permanently delete an item
			 */
			 @RequestMapping({"/pizzaStore/admin/delete/{categoryName}/{itemName}"})
			    public String adminDeleteItemFromMenuPage(@PathVariable("categoryName") String categoryName, @PathVariable("itemName") String itemName, Model model) {
				 
				 	//Check if the user is an admin
					 	
				 	
				 	
			        return "admin/adminDeleteItemPage";
			    }
			 	
				 @PostMapping("/deleteClickedItem")
				 public String deleteAnItem(@RequestParam("categoryName") String categoryName,
				                      		@RequestParam("itemName") String itemName) {
					//If user is admin, continue. Else redirect to home.
					 	//Delete item from database
					 System.out.println("categoryName- " + categoryName + "     itemName- " + itemName);
				     
					 
					 return "redirect:/pizzaStore/admin/delete/showAllItems";
				 }
				 
	//Admin - Add Section			 
		 /*If user clicks 'Add an Item' at the optionsPage, they will be redirected here.
			 *	This will give the user textboxes and list the steps to add an item to the menu.
			 */
				 @RequestMapping({"/pizzaStore/admin/add/addAnItem"})
				    public String adminAddAnItemPage(Model model) {
					 
					 	//If user is admin, continue. Else redirect to home.
					 		//Show all items
					 	
					 	
				        return "admin/adminAddItemPage";
				}
				 
		 /*If user clicks 'Add an Item' at the optionsPage, they will be redirected here.
			 *	This will give the user textboxes and list the steps to add an item to the menu.
			 */
				 @RequestMapping({"/pizzaStore/admin/addItemToMenu"})
				    public String saveItemToMenu(Model model, @RequestParam("itemName") String itemName,
				    		@RequestParam("categoryName") String categoryName, @RequestParam("itemPrice") String itemPrice,
				    		@RequestParam("itemDescription") String itemDescription,
				    		
				    		@RequestParam(name = "mainToppingsName", required = false) String[] mainToppingsName,
				    		@RequestParam(name = "mainToppingsType",required = false) String[] mainToppingsType,
				    		@RequestParam(name = "mainToppingsTypes",required = false) String[] mainToppingsTypes,
				    		@RequestParam(name = "mainToppingsIsPizza",required = false) String[] mainToppingsIsPizza,
				    		@RequestParam(name = "mainToppingsExtra",required = false) String[] mainToppingsExtra,
				    		
				    		@RequestParam(name = "addonToppingsName", required = false) String[] addonToppingsName,
				    		@RequestParam(name = "addonToppingsType",required = false) String[] addonToppingsType,
				    		@RequestParam(name = "addonToppingsTypes",required = false) String[] addonToppingsTypes,
				    		@RequestParam(name = "addonToppingsIsPizza",required = false) String[] addonToppingsIsPizza,
				    		@RequestParam(name = "addonToppingsExtra",required = false) String[] addonToppingsExtra,
				    		@RequestParam(name = "addonToppingsPrice",required = false) String[] addonToppingsPrice,
				    		
				    		@RequestParam(name = "jpgfile", required = false) MultipartFile jpgFile
				    ) {
					 
						//Create item 
					 	Item item = CreateNewMenuItem.CreateItem(itemCategories, itemName, categoryName, itemPrice, itemDescription, mainToppingsName,
					            mainToppingsType, mainToppingsTypes, mainToppingsIsPizza, mainToppingsExtra, addonToppingsName,
					            addonToppingsType, addonToppingsTypes, addonToppingsIsPizza, addonToppingsExtra, addonToppingsPrice,
					            jpgFile);
					    //If item creation failed... redirect
					 	if (item == null) {
					         // Handle case when item could not be created. Redirect to admin home and show an error message.
					 		return "redirect:/pizzaStore/admin/optionsPage?itemCreationError=Item creation failed. Try again.";
					    }
					 	
					 	//Check if this item already exists.
					 	//If item does not exist, save image. If image exists. 
					 	if(item.getHasImage()) {
							//Save image to database, rename image to item name.
						}
					 	
					 	//Save item to database.
						 
						return "redirect:/pizzaStore/admin/optionsPage";
				}
		
			
	  //Admin - Edit Section		 
			 /*If user clicks 'Edit an Item' at the optionsPage, they will be redirected here.
			 *	This will list all of the item by category, 
			 * 	 and allow the user to click to view the item (and then edit it if they want)
			 */
				 @RequestMapping({"/pizzaStore/admin/edit/showAllItems"})
				    public String adminShowAllItemsEditPage(Model model) {
					 
					 	//If user is admin, continue. Else redirect to home.
					 		//Show all items
					 	
					 	
				        return "admin/adminShowAllEditPage";
				}
			 /*If user clicks on an item at the 'adminShowAllEditPage.html' page
			 *	They will be redirected to here which will list the item and its description.
			 *		At this page the user will be able to edit an existing item
			 */
			 @RequestMapping({"/pizzaStore/admin/edit/{categoryName}/{itemName}"})
			    public String adminEditItemFromMenuPage(@PathVariable("categoryName") String categoryName, @PathVariable("itemName") String itemName, Model model) {
				 
				 	//Check if the user is an admin
					 	
				 	
				 	
			        return "admin/adminEditItemPage";
			    }
			 	
				 @PostMapping("/editClickedItem")
				 public String editAnItem(@RequestParam("categoryName") String categoryName,
				                      		@RequestParam("itemName") String itemName) {
					//If user is admin, continue. Else redirect to home.
					 	//Delete item from database
					 System.out.println("categoryName- " + categoryName + "     itemName- " + itemName);
				     
					 
					 return "redirect:/pizzaStore/admin/edit/showAllItems";
				 }		 
			 
			 
			 
}
