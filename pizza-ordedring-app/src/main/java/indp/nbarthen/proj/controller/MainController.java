package indp.nbarthen.proj.controller;



import indp.nbarthen.proj.admin.CreateNewMenuItem;
import indp.nbarthen.proj.admin.SaveItemImage;
import indp.nbarthen.proj.menu.CartItem;
import indp.nbarthen.proj.menu.MenuItems;
import indp.nbarthen.proj.repository.Item;
import indp.nbarthen.proj.repository.OrdersRepository;
import indp.nbarthen.proj.user.ManageUsers;
import indp.nbarthen.proj.user.UserAccount;
import indp.nbarthen.proj.user.UserOrder;
import io.github.cdimascio.dotenv.Dotenv;
import jakarta.servlet.http.HttpSession;

import java.io.File;
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
	
	
	//Function to be called on every @ReqeustMapping to see if the user is logged in or a guest.
	public void setSessionAttributes(HttpSession session, Model model) {
	    UserAccount user = (UserAccount) session.getAttribute("user");
	    if (user == null) {
	        // handle case where user is not logged in
	        model.addAttribute("isLoggedIn", "false");
	    } 
	    else {
	        // User is logged in
	        model.addAttribute("isLoggedIn", "true");
	        model.addAttribute("userIsAdmin", user.isAdmin());
	    }
	}

	
	
	
	/* homePage.html
	 * 	This will be the home page
	 */
	 @RequestMapping({"/"})
	    public String homePage(Model model, HttpSession session, @RequestParam(name = "showError", required = false) String showError) {
		 	List<Item> menuItems = MenuItems.getMenuItemsList();
		 	
		 	if (showError != null) {
		 		//Error creating item
		        model.addAttribute("showError", showError);
		    }
		 	
		 	setSessionAttributes(session, model);
		 	
		 	model.addAttribute("menuItems", menuItems.toArray());
		 	model.addAttribute("itemCategories", itemCategories.toArray());
		 	
	        return "homePage";
	    }
	 
	 /* categoryPage.html
		 * 	Whenever the user clicks on one of the images at the home page, they will be directed to here.
		 * 		This will show all of the items for the given category.
	 */
	 @RequestMapping({"/pizzaStore/{categoryName}"})
	    public String categoryPage(Model model, HttpSession session, @PathVariable("categoryName") String categoryName) {
			List<Item> menuItems = MenuItems.getMenuItemsList();
		 	
			//Get items to display.
			List<Item> displayItems = new Vector<Item>();
			for(Item item : menuItems) {
				if(item.getCategory().equals(categoryName)) {
					displayItems.add(item);
				}
			}
		 	
			setSessionAttributes(session, model);
		 	//Default value for userSearchPopupError is 'none' (no error will popup)
		 	model.addAttribute("popupError", userSearchPopupError);
		 	model.addAttribute("menuItems", menuItems.toArray());
		 	model.addAttribute("itemCategories", itemCategories.toArray());
		 	model.addAttribute("displayItems", displayItems);
		 	
	        return "categoryPage";
	    }
	 
	 /* itemPage.html
		 * 	Whenever the user clicks on one of the images at the category page, they will be directed to here.
		 *  They can also be directed here by clicking it from the dropdown menu at the top of the page.
		 * 		This will show all of the options for a given item and allow them to add it to their cart.
	 */
	 @RequestMapping({"/pizzaStore/{categoryName}/{itemName}"})
	    public String itemPage(HttpSession session, @PathVariable("categoryName") String categoryName, @PathVariable("itemName") String itemName, Model model) {
		 	List<Item> menuItems = MenuItems.getMenuItemsList();
		 	
		 	Item item = MenuItems.getItemFromMenu(itemName, categoryName);
		 	
		 	//If there was an error getting item from menu.
		 	if(item.getItemName() == null || item.getItemName().isEmpty()) {
		 		//Redirect to home and show popup error.
		 		return "redirect:/?showError=Item not found. Try again.";
		 	}
		 	
		 	setSessionAttributes(session, model);
		 	
		 	model.addAttribute("itemCategories", itemCategories.toArray());
		 	model.addAttribute("menuItems", menuItems.toArray());
		 	model.addAttribute("item", item);
		 	
		 	
	        return "itemPage";
	    }
	 
	 /* Redirect from itemPage.html
	  * 	When the user hits 'Add' on itemPage this will add the item to their cart.
	 */
	 @PostMapping({"/pizzaStore/addToCart"})
	 public String addItemToCart(Model model, HttpSession session,
			 	@RequestParam("itemName") String itemName,
	    		@RequestParam("categoryName") String categoryName, 
	    		@RequestParam("customDesc") String customInstructions, 
	    		
	    		@RequestParam(name = "main-drop-dropdownLabelName", required = false) String[] mainDropNames,
	    		@RequestParam(name = "main-drop-selectedOption",required = false) String[] mainDropSelected,
	    		@RequestParam(name = "main-drop-selectedAmount",required = false) String[] mainDropAmounts,
	    		
	    		@RequestParam(name = "main-lne-toppingName",required = false) String[] mainLNENames,
	    		@RequestParam(name = "main-lne-sideOfPizza",required = false) String[] mainLNESideOfPizza,
	    		@RequestParam(name = "main-lne-selectedAmount",required = false) String[] mainLNEAmounts,
	    		
	    		@RequestParam(name = "addon-drop-dropdownLabelName", required = false) String[] addonDropNames,
	    		@RequestParam(name = "addon-drop-selectedOption",required = false) String[] addonDropSelected,
	    		@RequestParam(name = "addon-drop-selectedAmount",required = false) String[] addonDropAmounts,
	    		
	    		@RequestParam(name = "addon-lne-toppingName",required = false) String[] addonLNENames,
	    		@RequestParam(name = "addon-lne-sideOfPizza",required = false) String[] addonLNESideOfPizza,
	    		@RequestParam(name = "addon-lne-selectedAmount",required = false) String[] addonLNEAmounts
	    		
	    ) {
		 
		 	List<Item> menuItems = MenuItems.getMenuItemsList();
		 	
		 	Item item = MenuItems.getItemFromMenu(itemName, categoryName);
		 	
		 	//If there was an error getting item from menu.
		 	if(item.getItemName() == null || item.getItemName().isEmpty()) {
		 		//Redirect to home and show popup error.
		 		return "redirect:/?showError=Item not found. Try again.";
		 	}
		 	
		 	//Generate cart item from passed parameters.
		 	Item cartItem = CartItem.generateItemForCart(item, customInstructions,
		 			mainDropNames, mainDropSelected, mainDropAmounts, 
		 			mainLNENames, mainLNESideOfPizza, mainLNEAmounts, 
		 			addonDropNames, addonDropSelected, addonDropAmounts, 
		 			addonLNENames, addonLNESideOfPizza, addonLNEAmounts);
		 	//Get final price for the item.
		 	cartItem = CartItem.getFinalPrice(cartItem);
		 	
		 	//Add item to users cart
		 		//STILL NEED TO DO THIS
		 	
		 	return "redirect:/";
	    }
	 
	 @RequestMapping({"/pizzaStore/checkout"})
	    public String checkoutPage(Model model, HttpSession session) {
		 	List<Item> menuItems = MenuItems.getMenuItemsList();
		 	
		 	setSessionAttributes(session, model);
		 	
		 	model.addAttribute("itemCategories", itemCategories.toArray());
		 	model.addAttribute("menuItems", menuItems.toArray());
		 	
	        return "checkoutPage";
	    }
	 
	 /* sign-inPage.html
		 * 	This will be used to allow the user login to their account.
	 */
	 @RequestMapping({"/pizzaStore/signin"})
	    public String signInPage(Model model, HttpSession session, @RequestParam(name = "showError", required = false) String showError) {
		 	List<Item> menuItems = MenuItems.getMenuItemsList();
		 	
		 	if (showError != null) {
		 		//Error creating item
		        model.addAttribute("showError", showError);
		    }
		 	
		 	setSessionAttributes(session, model);
		 	
		 	model.addAttribute("itemCategories", itemCategories.toArray());
		 	model.addAttribute("menuItems", menuItems.toArray());
		 	
	        return "sign-inPage";
	    }
	 
	 @PostMapping("/signin")
	 public String signUp(HttpSession session,
			 			  @RequestParam("email") String email,
	                      @RequestParam("password") String password) { 
			//If email is valid (email exist in database)
		    if (ManageUsers.checkIfValidEmail(email)) {
		        //Try signing in using passed password
		        UserAccount user = ManageUsers.getUser(email, password);
		        if (user == null) {
		            //Invalid password
		            return "redirect:/pizzaStore/signin?showError=Password does not match. Try again.";
		        } else {
		            //User is signed in
		            session.setAttribute("user", user);
		            return "redirect:/";
		        }
		    } 
		 else {
			 return "redirect:/pizzaStore/signin?showError=Email does not exist. Try again or sign up.";
		 }
		 
	 }
	 
	 @RequestMapping("/logout")
	 public String logout(HttpSession session) { 
			//If email is valid. 
		 	session.invalidate(); // Invalidate the session
		    return "redirect:/"; //Redirect to home.
		 
		 
	 }
	 
	 @RequestMapping("/pizzaStore/editAccountInformation")
	 public String editAccountInfo(Model model, HttpSession session) { 
		 	List<Item> menuItems = MenuItems.getMenuItemsList();
		 	
		 	UserAccount user = (UserAccount) session.getAttribute("user");
		 	
		 	setSessionAttributes(session, model);
		 	
		 	model.addAttribute("user", user);
		 	model.addAttribute("menuItems", menuItems.toArray());
		 	model.addAttribute("itemCategories", itemCategories.toArray());
		 	
		 
		 	return "editAccountPage";
	 }
	 
	 	@PostMapping("/pizzaStore/finishEditAccount")
	 		public String editUsersAccount(HttpSession session,
	 					  @RequestParam("firstname") String firstName,
	                      @RequestParam("lastname") String lastName,
	                      @RequestParam("phone") String phoneNumber,
	                      @RequestParam("address") String address,
	                      @RequestParam("apartment") String apartmentNum,
	                      @RequestParam("email") String email,
	                      @RequestParam("password") String passwordHash) {
	 		
	 	 UserAccount sessionUser = (UserAccount) session.getAttribute("user");
		 
	     // Create the UserAccount object with hashed password
	     UserAccount editedUser = new UserAccount(firstName, lastName, phoneNumber, address, apartmentNum, email, passwordHash);

	     // Save the user account to your database
	     //If password matches saved password.
	     if(ManageUsers.checkIfPasswordsMatch(sessionUser.getEmail(), passwordHash)) {
	    	 //If there was an error updating users information.
	    	 if(!ManageUsers.editUser(editedUser)) {
		    	 //Redirect to home. Show error.
		    	 return "redirect:/?showError=Error updating account information.";
		     }
	     }
	     else {
	    	 //Invalid password sent when editing user's info.
	    	 return "redirect:/?showError=Incorrect Password. Try again.";
	     }
	     
	     

	     return "redirect:/?showError=Account updated.";
	 }
	 
	 @RequestMapping("/pizzaStore/changeAccountPassword")
	 public String changeAccountPass(Model model, HttpSession session) { 
		 	List<Item> menuItems = MenuItems.getMenuItemsList();
		 	
		 	UserAccount user = (UserAccount) session.getAttribute("user");
		 	
		 	setSessionAttributes(session, model);
		 	
		 	model.addAttribute("user", user);
		 	model.addAttribute("menuItems", menuItems.toArray());
		 	model.addAttribute("itemCategories", itemCategories.toArray());
		 	
		 
		 	return "editAccountPage";
	 }
	 
	 /* sign-upPage.html
		 * 	This will be used to allow the user to create an account.
	*/
	 @RequestMapping({"/pizzaStore/signup"})
	    public String signUpPage(Model model, HttpSession session) {
		 	List<Item> menuItems = MenuItems.getMenuItemsList();
		 	
		 	UserAccount user = (UserAccount) session.getAttribute("user");
		 	if (user == null) {
		        model.addAttribute("isLoggedIn", "false");
		    } 
		 	else {
		    	return "redirect:/?showError=Logout before trying to sign in to a new account.";
		    }
		 	
		 	model.addAttribute("itemCategories", itemCategories.toArray());
		 	model.addAttribute("menuItems", menuItems.toArray());
		 	
	        return "sign-upPage";
	    }
	
	 @PostMapping("/signup")
	 public String signUp(@RequestParam("firstname") String firstName,
	                      @RequestParam("lastname") String lastName,
	                      @RequestParam("phone") String phoneNumber,
	                      @RequestParam("address") String address,
	                      @RequestParam("apartment") String apartmentNum,
	                      @RequestParam("email") String email,
	                      @RequestParam("password") String passwordHash) {
		 
		 
	     // Create the UserAccount object with hashed password
	     UserAccount user = new UserAccount(firstName, lastName, phoneNumber, address, apartmentNum, email, passwordHash);

	     // Save the user account to your database
	     if(!ManageUsers.addUser(user)) {
	    	 //Error creating account. Redirect to signup.
	    	 return "redirect:/pizzaStore/signin?showError=Error creating account. Email may already be in use.";
	     }
	     

	     return "redirect:/";
	 }
	 
	 
	 
	//Admin Section
		 //Admin options page. Shows selectors to delete, add, edit items on the menu.
		 @RequestMapping({"/pizzaStore/admin/optionsPage"})
		 	public String adminOptionsPage(Model model, HttpSession session, @RequestParam(name = "itemCreationError", required = false) String itemCreationError) {
			 	
			 	UserAccount user = (UserAccount) session.getAttribute("user");
			 	
			 	//Check if user is signed in and is an admin.
			    if (user != null && user.isAdmin()) {
			    	// User is an admin
			    	List<Item> menuItems = MenuItems.getMenuItemsList();
					 
				 	if (itemCreationError != null) {
				 		//Error creating item
				        model.addAttribute("itemCreationError", itemCreationError);
				    }
				 
				 	setSessionAttributes(session, model);
				 	
				 	model.addAttribute("itemCategories", itemCategories.toArray());
				 	model.addAttribute("menuItems", menuItems.toArray());
			    } 
			    else {
				 	// User is not an admin
			    	return "redirect:/?showError=You are not an admin. You do not have permission to go here.";
			    }
			 	
			 	
		        return "admin/adminOptionsPage";
		    }
	 //Admin - DeleteSection		 
		/*If user clicks 'Delete an Item' at the optionsPage, they will be redirected here.
		 *	This will list all of the item by category, 
		 * 	 and allow the user to click to view the item (and then delete it if they want)
		 */
			 @RequestMapping({"/pizzaStore/admin/delete/showAllItems"})
			    public String adminShowAllItemsDeletePage(Model model, HttpSession session) {
				 
				 	UserAccount user = (UserAccount) session.getAttribute("user");
				 	
				 	//Check if user is signed in and is an admin.
				    if (user != null && user.isAdmin()) {
				    	// User is an admin
				    	List<Item> menuItems = MenuItems.getMenuItemsList();
					 	
				    	setSessionAttributes(session, model);
					 
					 	model.addAttribute("itemCategories", itemCategories.toArray());
					 	model.addAttribute("menuItems", menuItems.toArray());
				    } 
				    else {
					 	// User is not an admin
				    	return "redirect:/?showError=You are not an admin. You do not have permission to go here.";
				    }
				 	
				 	
			        return "admin/adminShowAllDeletePage";
			}
		 /*If user clicks on an item at the 'adminShowAllDeletePage.html' page
			 *	They will be redirected to here which will list the item and its description.
			 *		At this page the user will be able to permanently delete an item
			 */
			 @RequestMapping({"/pizzaStore/admin/delete/{categoryName}/{itemName}"})
			    public String adminDeleteItemFromMenuPage(HttpSession session, @PathVariable("categoryName") String categoryName, @PathVariable("itemName") String itemName, Model model) {
				 	
				 	UserAccount user = (UserAccount) session.getAttribute("user");
				 	
				 	//Check if user is signed in and is an admin.
				    if (user != null && user.isAdmin()) {
				    	// User is an admin
				    	List<Item> menuItems = MenuItems.getMenuItemsList();
					 	//Check if the user is an admin
					 	Item item = MenuItems.getItemFromMenu(itemName, categoryName);
					 	
					 	//If there was an error getting item from menu.
					 	if(item.getItemName() == null || item.getItemName().isEmpty()) {
					 		//Redirect to home and show popup error.
					 		return "redirect:/?showError=Item not found. Try again.";
					 	}
					 	
					 	setSessionAttributes(session, model);
					 	
					 	model.addAttribute("itemCategories", itemCategories.toArray());
					 	model.addAttribute("menuItems", menuItems.toArray());
					 	model.addAttribute("item", item);
				    } 
				    else {
					 	// User is not an admin
				    	return "redirect:/?showError=You are not an admin. You do not have permission to go here.";
				    }
				 	
			        return "admin/adminDeleteItemPage";
			    }
			 	
				 @PostMapping("/deleteClickedItem")
				 public String deleteAnItem(HttpSession session, @RequestParam("categoryName") String categoryName,
				                      		@RequestParam("itemName") String itemName) {
					 	
					 	UserAccount user = (UserAccount) session.getAttribute("user");
					 	//Check if user is signed in and is an admin.
					    if (user != null && user.isAdmin()) {
					    	// User is an admin
					    	
					    	//Delete item from database
						 	Item item = MenuItems.getItemFromMenu(itemName, categoryName);
						 	
						 	//If there was an error getting item from menu.
						 	if(item.getItemName() == null || item.getItemName().isEmpty()) {
						 		//Redirect to home and show popup error.
						 		return "redirect:/?showError=Item not found. Try again.";
						 	}
						 	
						 	MenuItems.removeItemFromMenu(itemName, categoryName);
						 
					    } 
					    else {
						 	// User is not an admin
					    	return "redirect:/?showError=You are not an admin. You do not have permission to go here.";
					    }
					 	
					 
					 
					 return "redirect:/pizzaStore/admin/delete/showAllItems";
				 }
				 
	//Admin - Add Section			 
		 /*If user clicks 'Add an Item' at the optionsPage, they will be redirected here.
			 *	This will give the user textboxes and list the steps to add an item to the menu.
			 */
				 @RequestMapping({"/pizzaStore/admin/add/addAnItem"})
				    public String adminAddAnItemPage(HttpSession session, Model model) {
					 
					 	UserAccount user = (UserAccount) session.getAttribute("user");
					 	//Check if user is signed in and is an admin.
					    if (user != null && user.isAdmin()) {
					    	// User is an admin
					    	List<Item> menuItems = MenuItems.getMenuItemsList();
						 	//Show all items
					    	setSessionAttributes(session, model);
					    	
						 	model.addAttribute("itemCategories", itemCategories.toArray());
						 	model.addAttribute("menuItems", menuItems.toArray());
					    } 
					    else {
						 	// User is not an admin
					    	return "redirect:/?showError=You are not an admin. You do not have permission to go here.";
					    }
					 	
					 	
				        return "admin/adminAddItemPage";
				}
				 
		 /*If user clicks 'Add an Item' at the optionsPage, they will be redirected here.
			 *	This will give the user textboxes and list the steps to add an item to the menu.
			 */
				 @RequestMapping({"/pizzaStore/admin/addItemToMenu"})
				    public String saveItemToMenu(
				    		Model model, HttpSession session, 
				    		@RequestParam("itemName") String itemName,
				    		@RequestParam("categoryName") String categoryName, 
				    		@RequestParam("itemPrice") String itemPrice,
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
				    		
				    		@RequestParam(name = "jpgFile", required = false) MultipartFile jpgFile
				    ) {
				
					 	
					 	UserAccount user = (UserAccount) session.getAttribute("user");
					 	//Check if user is signed in and is an admin.
					 	
					    if (user != null && user.isAdmin()) {
					    	// User is an admin
					    	
					    	//Creates item 
						 	Item item = CreateNewMenuItem.CreateItem(itemCategories, itemName, categoryName, itemPrice, itemDescription, mainToppingsName,
						            mainToppingsType, mainToppingsTypes, mainToppingsIsPizza, mainToppingsExtra, addonToppingsName,
						            addonToppingsType, addonToppingsTypes, addonToppingsIsPizza, addonToppingsExtra, addonToppingsPrice,
						            jpgFile);
						    //If item creation failed... redirect
						 	if (item == null) {
						         // Handle case when item could not be created. Redirect to admin home and show an error message.
						 		return "redirect:/pizzaStore/admin/optionsPage?itemCreationError=Item creation failed. Try again.";
						    }
						 	
						 	
						 	/* CreateNewMenuItem.addItemToDatabase(item, jpgFile) 
						 	  *  Saves item to database.
						 		 *  Checks if item already exists, 
						 		 *  Saves image to database (if it exists), 
						 		 *  Saves item to MenuItems.json
						 	*/
						 	if(!CreateNewMenuItem.addItemToDatabase(item, jpgFile, false)) {
						 		//Error saving item
						 		return "redirect:/pizzaStore/admin/optionsPage?itemCreationError=Error saving item. Item may already exsit.";
						 	}
					    } 
					    else {
						 	// User is not an admin
					    	return "redirect:/?showError=You are not an admin. You do not have permission to go here.";
					    }
					 	
						
					 	
					 	return "redirect:/pizzaStore/admin/optionsPage?itemCreationError=Item was added to the menu! :D";
				}
		
			
	  //Admin - Edit Section		 
			 /*If user clicks 'Edit an Item' at the optionsPage, they will be redirected here.
			 *	This will list all of the item by category, 
			 * 	 and allow the user to click to view the item (and then edit it if they want)
			 */
				 @RequestMapping({"/pizzaStore/admin/edit/showAllItems"})
				    public String adminShowAllItemsEditPage(Model model, HttpSession session) {
					 	
					 	UserAccount user = (UserAccount) session.getAttribute("user");
					 	//Check if user is signed in and is an admin.
					    if (user != null && user.isAdmin()) {
					    	// User is an admin
					    	
					    	List<Item> menuItems = MenuItems.getMenuItemsList();
						 	
					    	setSessionAttributes(session, model);
					    	
						 	model.addAttribute("itemCategories", itemCategories.toArray());
						 	model.addAttribute("menuItems", menuItems.toArray());
					    } 
					    else {
						 	// User is not an admin
					    	return "redirect:/?showError=You are not an admin. You do not have permission to go here.";
					    }
					 	
					 	
				        return "admin/adminShowAllEditPage";
				}
			 /*If user clicks on an item at the 'adminShowAllEditPage.html' page
			 *	They will be redirected to here which will list the item and its description.
			 *		At this page the user will be able to edit an existing item
			 */
			 @RequestMapping({"/pizzaStore/admin/edit/{categoryName}/{itemName}"})
			    public String adminEditItemFromMenuPage(HttpSession session, @PathVariable("categoryName") String categoryName, @PathVariable("itemName") String itemName, Model model) {
				 	
				 	UserAccount user = (UserAccount) session.getAttribute("user");
				 	//Check if user is signed in and is an admin.
				    if (user != null && user.isAdmin()) {
				    	// User is an admin
				    	
				    	List<Item> menuItems = MenuItems.getMenuItemsList();
					 	//Check if the user is an admin
						 
					 	//Get item from menu
					 	Item item = MenuItems.getItemFromMenu(itemName, categoryName);
					 	
					 	//If there was an error getting item from menu.
					 	if(item.getItemName() == null || item.getItemName().isEmpty()) {
					 		//Redirect to home and show popup error.
					 		return "redirect:/?showError=Item not found. Try again.";
					 	}
					 	
					 	setSessionAttributes(session, model);
					 	
					 	model.addAttribute("itemCategories", itemCategories.toArray());
					 	model.addAttribute("menuItems", menuItems.toArray());
					 	model.addAttribute("item", item);
				    } 
				    else {
					 	// User is not an admin
				    	return "redirect:/?showError=You are not an admin. You do not have permission to go here.";
				    }
				 	
				 	
				 
				 	
			        return "admin/adminEditItemPage";
			    }
			 	
			 	//Update the menu (when editing an item)
				 @PostMapping("/pizzaStore/admin/updateItemOnMenu")
				 public String editAnItem(Model model, HttpSession session,  
						 	@RequestParam("itemName") String itemName,
				    		@RequestParam("categoryName") String categoryName, 
				    		@RequestParam("itemPrice") String itemPrice,
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
				    		
				    		@RequestParam(name = "jpgFile", required = false) MultipartFile jpgFile
				    ) {
					 
					 	UserAccount user = (UserAccount) session.getAttribute("user");
					 	//Check if user is signed in and is an admin.
					    if (user != null && user.isAdmin()) {
					    	// User is an admin
					    	
					    	//Creates item 
						 	Item item = CreateNewMenuItem.CreateItem(itemCategories, itemName, categoryName, itemPrice, itemDescription, mainToppingsName,
						            mainToppingsType, mainToppingsTypes, mainToppingsIsPizza, mainToppingsExtra, addonToppingsName,
						            addonToppingsType, addonToppingsTypes, addonToppingsIsPizza, addonToppingsExtra, addonToppingsPrice,
						            jpgFile);
						    //If item creation failed... redirect
						 	if (item == null) {
						         // Handle case when item could not be created. Redirect to admin home and show an error message.
						 		return "redirect:/pizzaStore/admin/optionsPage?itemCreationError=Item creation failed. Try again.";
						    }
						 	
						 	//Find the item in the database, delete item. Add updated item to database.
						 	//Get item from menu
						 	Item menuItem = MenuItems.getItemFromMenu(itemName, categoryName);
						 	
						 	//If there was an error getting item from menu.
						 	if(menuItem.getItemName() == null || menuItem.getItemName().isEmpty()) {
						 		//Redirect to home and show popup error.
						 		return "redirect:/?showError=Item not found. Could not be edited. Try again.";
						 	}
						 	
						 	boolean oldItemHasImage = menuItem.getHasImage();
						 	//Remove Item
						 	MenuItems.removeItemFromMenu(itemName, categoryName);
						 	
						 	//Add updated item to menu
						 	if(!CreateNewMenuItem.addItemToDatabase(item, jpgFile, oldItemHasImage)) {
						 		//Error saving item
						 		return "redirect:/pizzaStore/admin/optionsPage?itemCreationError=Error saving item. Item may already exsit.";
						 	}
					    } 
					    else {
						 	// User is not an admin
					    	return "redirect:/?showError=You are not an admin. You do not have permission to go here.";
					    }
					 	
					 	
				     
					 
					 return "redirect:/pizzaStore/admin/edit/showAllItems";
				 }		 
			 
			 
			 
}
