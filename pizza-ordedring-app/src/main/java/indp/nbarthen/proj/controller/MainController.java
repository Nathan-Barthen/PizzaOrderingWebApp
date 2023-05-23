package indp.nbarthen.proj.controller;



import indp.nbarthen.proj.admin.CreateNewMenuItem;
import indp.nbarthen.proj.admin.SaveItemImage;
import indp.nbarthen.proj.menu.CartItem;
import indp.nbarthen.proj.menu.MenuItems;
import indp.nbarthen.proj.menu.UpdateOrderInformation;
import indp.nbarthen.proj.repository.Item;
import indp.nbarthen.proj.repository.OrdersRepository;
import indp.nbarthen.proj.user.ManageUsers;
import indp.nbarthen.proj.user.UserAccount;
import indp.nbarthen.proj.user.UserOrder;
import io.github.cdimascio.dotenv.Dotenv;
import jakarta.servlet.http.HttpSession;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
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
	private String storeName;
	private String storeLocation;
	private String storePhoneNum;
	
	
	public MainController(OrdersRepository  ordersRepository) {
		this.ordersRepository = ordersRepository;
		this.userSearchPopupError = "none";
		itemCategories = Arrays.asList( "Pizzas", "Sides", "Wings", "Pasta", "Wedgie", "Desserts", "Drinks", "Misc");
		storeName = "Elemental Pizzas";
		storeLocation = "115 Elemental Avenue";
		storePhoneNum = "000-000-0000";
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
	    public String homePage(Model model, HttpSession session, 
	    		@RequestParam(name = "showError", required = false) String showError) 
	 {
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
	    public String categoryPage(Model model, HttpSession session, 
	    		@RequestParam(name="itemSearchString", required = false) String itemSearchString,
	    		@PathVariable("categoryName") String categoryName)
	 {
			List<Item> menuItems = MenuItems.getMenuItemsList();
		 	
			//Get items to display.
			List<Item> displayItems = new Vector<Item>();
			//Check if query is for item search
			if(categoryName.contains("ItemSearch")) {
				for(Item item : menuItems) {
					//Check if item name contains searchString
					if(item.getItemName().toLowerCase().contains(itemSearchString.toLowerCase())) {
						//Add item.
						displayItems.add(item);
					}
				}
				if(displayItems.size() < 1) {
					return "redirect:/?showError=No results found for item names containing: '" + itemSearchString + "'.";
				}
			}
			//Get items for particular category
			else {
				for(Item item : menuItems) {
					if(item.getCategory().equals(categoryName)) {
						displayItems.add(item);
					}
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
	  * 	Can also be used to update an item in user's cart.
	 */
	 @PostMapping({"/pizzaStore/addToCart"})
	 public String addItemToCart(Model model, HttpSession session,
			 	@RequestParam("itemName") String itemName,
	    		@RequestParam("categoryName") String categoryName, 
	    		@RequestParam("customDesc") String customInstructions, 
	    		@RequestParam("itemSelectedCost") String itemSelectedCost,
	    		@RequestParam("numbertOfItem") int numbertOfItem,
	    		@RequestParam("updateItem") String updateItem,
	    		@RequestParam(name="updateItemId", required = false) Long updateItemId,
	    		
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
		 	Item cartItem = CartItem.generateItemForCart(item, numbertOfItem, itemSelectedCost, customInstructions,
		 			mainDropNames, mainDropSelected, mainDropAmounts, 
		 			mainLNENames, mainLNESideOfPizza, mainLNEAmounts, 
		 			addonDropNames, addonDropSelected, addonDropAmounts, 
		 			addonLNENames, addonLNESideOfPizza, addonLNEAmounts);
		 	//Get final price for the item.
		 	cartItem = CartItem.getFinalPrice(cartItem);
		 	
		 	//Add item to users cart
		 	
		 	//Check if user is logged in. 
		 	UserAccount user = (UserAccount) session.getAttribute("user");
		 	//User is not logged in.
		    if (user == null) {
		    	//Make guest user.
		    	UserAccount guestUser = new UserAccount();
		    	session.setAttribute("user", guestUser);
		    	
		    } 
		    
		    user = (UserAccount) session.getAttribute("user");
		    //Get order session attribute.
		    UserOrder order = (UserOrder) session.getAttribute("order");
		    List<Item> items = new Vector<Item>();
		    //This is the first item being added to the cart. (No order created yet)
		    //User is a guest (urder == null) Order is created on login.
	    	if (order == null) {
	    		cartItem.setId(0);
	    		UserOrder newOrder = new UserOrder();
		    	items = newOrder.getItems();
		    	items.add(cartItem);
		    	newOrder.setItems(items);
		    	newOrder.setStoreName(storeName);
	            newOrder.setStoreLocation(storeLocation);
	            newOrder.setStorePhoneNumber(storePhoneNum);
	            newOrder.setHomeAddress(" ");
	            newOrder.setAptNumber(" ");
	            
	            if(user.getFirstName().contains("Guest")) {
	            	//Guest order.
	            	newOrder.setUsersFirstName("Guest");
	            	newOrder.setUsersLastName("Guest");
	            	newOrder.setUsersPhoneNum("Guest");
	            	newOrder.setUsersEmail("Guest");
	            }
	            
		    	order = newOrder;
	    	}
	    	//Items have already been addedto users order/cart.
	    	else {
	    		//Get items already added to order
	    		cartItem.setId(order.getItems().size());
	    		items = order.getItems();
	    		//Check if user is updating an item.
	    		if(updateItem.contains("true")) {
	    			//Update item.
	    			cartItem.setId(updateItemId);
	    			//Find item to update
	    			for (int i = 0; i < items.size(); i++) {
	    	            Item currentItem = items.get(i);
	    	            
	    	            if (currentItem.getId() == updateItemId) {
	    	                // Replace item at index i with cartItem
	    	                items.set(i, cartItem);
	    	                break; // Exit the loop once item is updated
	    	            }
	    	        }
	    		}
	    		else {
		    		//Add new item. 
		    		items.add(cartItem);
	    		}
	    		//Update order.
	    		order.setItems(items);
	    	}
	    	
		 	//Update session attribute
	    	session.setAttribute("order", order);
	    	
	    	
		 	return "redirect:/";
	    }
	 
	 
	 //Removes item from cart using item's id.
	 @RequestMapping({"/pizzaStore/removeItemFromCart/{itemId}"})
	    public String removeItemFromCart(Model model, HttpSession session, 
	    		@PathVariable("itemId") long itemId) 
	 {
		 	UserAccount user = (UserAccount) session.getAttribute("user");
		 	UserOrder order = (UserOrder) session.getAttribute("order");
		 	
		 	//Not logged in or cart is empty. Redirect to home.
		 	if (user == null || order.getItems().size() < 1) {
		 		return "redirect:/?showError=Cart is empty.";
		    }
		 	
		 	//Gets items in users cart
		 	List<Item> items = order.getItems();
		 	for(int i=0; i<items.size(); i++) {
		 		//If item id's match. Remove index.
		 		if(items.get(i).getId() == itemId) {
		 			items.remove(i);
		 			break;
		 		}
		 	}
		 
		 	//Update order and session attribute.
		 	order.setItems(items);
		 	session.setAttribute("order", order);
		 	
		 	
		 	return "redirect:/pizzaStore/checkout";
	 }
	 
	 @RequestMapping({"/pizzaStore/editCart/{itemId}/{itemName}"})
	    public String checkoutPage(Model model, HttpSession session,
	    		@PathVariable("itemId") long itemId, @PathVariable("itemName") String itemName) 
	 {
		 	List<Item> menuItems = MenuItems.getMenuItemsList();
		 	
		 	setSessionAttributes(session, model);
		 	
		 	UserAccount user = (UserAccount) session.getAttribute("user");
		 	UserOrder order = (UserOrder) session.getAttribute("order");
		 	//Not logged in or cart is empty. Redirect to home.
		 	if (user == null || order.getItems().size() < 1) {
		 		return "redirect:/?showError=Cart is empty.";
		    }
		 	
		 	
		 	//Get the item the user wants to edit using itemId.
		 	Item itemToEdit  = new Item();
		 	for(Item i : order.getItems()) {
		 		if(i.getId() == itemId) {
		 			itemToEdit = i;
		 		}
		 	}
		 	
		 	
		 	model.addAttribute("item", itemToEdit);
		 	
		 	model.addAttribute("itemCategories", itemCategories.toArray());
		 	model.addAttribute("menuItems", menuItems.toArray());
		 	
	        return "editItemPage";
	  }
	 
	 @RequestMapping({"/pizzaStore/checkout"})
	    public String checkoutPage(Model model, HttpSession session,
	    		@RequestParam(name = "showError", required = false) String showError) 
	 {
		 	List<Item> menuItems = MenuItems.getMenuItemsList();
		 	
		 	setSessionAttributes(session, model);
		 	
		 	UserAccount user = (UserAccount) session.getAttribute("user");
		 	UserOrder order = (UserOrder) session.getAttribute("order");
		 	//Not logged in or cart is empty. Redirect to home.
		 	if (user == null || order.getItems().size() < 1) {
		 		return "redirect:/?showError=Cart is empty.";
		    }
		 	
		 	
		 	model.addAttribute("user", user);
		 	model.addAttribute("order", order);
		 	
		 	model.addAttribute("itemCategories", itemCategories.toArray());
		 	model.addAttribute("menuItems", menuItems.toArray());
		 	
	        return "checkoutPage";
	  }
	 
	 //Updates delivery information before going to payment page.
	 @PostMapping({"/pizzaStore/checkout/updateOrderInformation"})
	    public String confirmOrderBeforePayment(HttpSession session,
	    		@RequestParam(name = "homeAddress", required = false) String homeAddress,
	    		@RequestParam(name = "aptNumber", required = false) String aptNumber,
	    		@RequestParam(name = "deliveryInstructions", required = false) String deliveryInstructions,
	    		@RequestParam(name = "pickupAtStore", required = false) String pickupAtStore,
	    		@RequestParam(name = "asapOrLater", required = false) String asapOrLater,
	    		@RequestParam(name = "laterSelectedDate", required = false) String laterSelectedDate,
	    		@RequestParam(name = "laterSelectedTime", required = false) String laterSelectedTime) 
	 {
		 	List<Item> menuItems = MenuItems.getMenuItemsList();
		 	
		 	
		 	UserAccount user = (UserAccount) session.getAttribute("user");
		 	UserOrder order = (UserOrder) session.getAttribute("order");
		 	//Not logged in or cart is empty. Redirect to home.
		 	if (user == null || order.getItems().size() < 1) {
		 		return "redirect:/?showError=Cart is empty.";
		    }
		 	
		 	//Delivery selected, but no address given. Redirect with error.
		 	if(pickupAtStore.contains("delivery") && homeAddress.length() <= 1) {
		 		return "redirect:/pizzaStore/checkout?showError=Enter a delivery address.";
		 	}
		 	
		 	
		 	//Update order information using passed checkout variables.
		 	order = UpdateOrderInformation.generateItemForCart(order, homeAddress, aptNumber, 
		 			deliveryInstructions,  pickupAtStore,  asapOrLater, 
		 			laterSelectedDate, laterSelectedTime); 
		 
		 	
		 	//Update order session attribute
		 	session.setAttribute("order", order);
		 	
		 	//Redirect to payment page
		 	return "redirect:/pizzaStore/checkout/payment";
	    }
	 
	//Page where payment information will be given.
	 @RequestMapping({"/pizzaStore/checkout/payment"})
	    public String chechoutPaymentPage(Model model, HttpSession session,
	    		@RequestParam(name = "showError", required = false) String showError) 
	 {
		 	List<Item> menuItems = MenuItems.getMenuItemsList();
		 	
		 	setSessionAttributes(session, model);
		 	
		 	UserAccount user = (UserAccount) session.getAttribute("user");
		 	UserOrder order = (UserOrder) session.getAttribute("order");
		 	//Not logged in or cart is empty. Redirect to home.
		 	if (user == null || order.getItems().size() < 1) {
		 		return "redirect:/?showError=Cart is empty.";
		    }
		 	
		 	
		 	model.addAttribute("user", user);
		 	model.addAttribute("order", order);
		 	
		 	model.addAttribute("itemCategories", itemCategories.toArray());
		 	model.addAttribute("menuItems", menuItems.toArray());
		 	
	        return "paymentPage";
	  }
	 
	/* Submits order. Adding order to users account to view later.
	 	  -If user is a guest. It would just submit order to store.
	   Is not currently linked to a store. If it were this would send order information to store.
	*/
		 @RequestMapping({"/pizzaStore/payment/submitOrder"})
		    public String submitOrder(Model model, HttpSession session,
		    		@RequestParam(name = "showError", required = false) String showError) 
		 {
			 	List<Item> menuItems = MenuItems.getMenuItemsList();
			 	
			 	setSessionAttributes(session, model);
			 	
			 	UserAccount user = (UserAccount) session.getAttribute("user");
			 	UserOrder order = (UserOrder) session.getAttribute("order");
			 	//Not logged in or cart is empty. Redirect to home.
			 	if (user == null || order.getItems().size() < 1) {
			 		return "redirect:/?showError=Cart is empty. Can't submit order.";
			    }
			 	
			 	//If user is a guest (not logged in)
			 	if(user.getFirstName().contains("Guest")) {
			 		//Since this is not linked to a store. It cannot save order to users account.
			 		//If it were linked to a store. Order would still be sent to store.
			 		return "redirect:/?showError=Guest order submitted.";
			 	}
			 	
			 	ManageUsers.submitOrderAndUpdateUser(user, order);
			 	
			 	return "redirect:/?showError=Order submitted for " + user.getFirstName() + ".";
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
	 
	 //Commits sign in
	 @PostMapping("/signin")
	 public String signUp(HttpSession session,
			 			  @RequestParam("email") String email,
	                      @RequestParam("password") String password) 
	 { 
			//If email is valid (email exist in database)
		    if (ManageUsers.checkIfValidEmail(email)) {
		        //Try signing in using passed password
		        UserAccount user = ManageUsers.getUser(email, password);
		        if (user == null) {
		            //Invalid password
		            return "redirect:/pizzaStore/signin?showError=Incorrect password. Try again.";
		        } 
		        else {
		            //User is signed in
		        	//Set user session 
		            session.setAttribute("user", user);
		            //Set order session attribute
		            UserOrder newOrder = new UserOrder();
		            newOrder.setStoreName(storeName);
		            newOrder.setStoreLocation(storeLocation);
		            newOrder.setStorePhoneNumber(storePhoneNum);
		            newOrder.setHomeAddress(user.getAddress());
		            if(user.getApartmentNum() == null || user.getApartmentNum() == "") {
		            	newOrder.setAptNumber(" ");
		            }
		            else {
		            	newOrder.setAptNumber(user.getApartmentNum());
		            }
		            newOrder.setUsersFirstName(user.getFirstName());
	            	newOrder.setUsersLastName(user.getLastName());
	            	newOrder.setUsersPhoneNum(user.getPhoneNumber());
	            	newOrder.setUsersEmail(user.getEmail());
	            	
			    	session.setAttribute("order", newOrder);
		            
		            
		            return "redirect:/";
		        }
		    } 
		 else {
			 return "redirect:/pizzaStore/signin?showError=Email does not exist. Try again or sign up.";
		 }
		 
	 }
	 
	 //Commits user logout
	 @RequestMapping("/logout")
	 public String logout(HttpSession session) { 
			//If email is valid. 
		 	session.invalidate(); // Invalidate the session
		    return "redirect:/"; //Redirect to home.
		 
		 
	 }
	 
	 
	 
	//Page to edit account information excluding password.
		 @RequestMapping("/pizzaStore/account/viewOrders")
		 public String accountViewOrders(Model model, HttpSession session) { 
			 List<Item> menuItems = MenuItems.getMenuItemsList();
			 	
			 	setSessionAttributes(session, model);
			 	
			 	UserAccount user = (UserAccount) session.getAttribute("user");
			 	//Not logged in or cart is empty. Redirect to home.
			 	if (user == null ) {
			 		return "redirect:/?showError=Login to view orders.";
			    }
			 	
			 	//Gets the list of orders for user.
			 	List<UserOrder> orders = ManageUsers.getUserOrders(user);
			 	
			 	model.addAttribute("user", user);
			 	model.addAttribute("orders", orders);
			 	
			 	model.addAttribute("itemCategories", itemCategories.toArray());
			 	model.addAttribute("menuItems", menuItems.toArray());
			 	
			 
			 	return "accountOrdersPage";
		 }
	 //Page to edit account information excluding password.
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
	 		
	 //Commits account edits.
	 	@PostMapping("/pizzaStore/finishEditAccount")
	 		public String editUsersAccount(HttpSession session,
	 					  @RequestParam("oldEmail") String oldEmail,
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
	     editedUser.setAdmin(sessionUser.isAdmin());
	     
	     // Save the user account to your database
	     if(sessionUser.getEmail() == null) {
	    	 return "redirect:/?showError=Guest account cannot be edited.";
	     }
	     //If password matches saved password.
	     if(ManageUsers.checkIfPasswordsMatch(sessionUser.getEmail(), passwordHash)) {
	    	 //If there was an error updating users information.
	    	 if(!ManageUsers.editUser(editedUser, oldEmail)) {
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
	 
	 //Page to change account password for a user.
	 @RequestMapping("/pizzaStore/changeAccountPassword")
	 public String changeAccountPass(Model model, HttpSession session) { 
		 	List<Item> menuItems = MenuItems.getMenuItemsList();
		 	
		 	UserAccount user = (UserAccount) session.getAttribute("user");
		 	
		 	setSessionAttributes(session, model);
		 	
		 	model.addAttribute("user", user);
		 	model.addAttribute("menuItems", menuItems.toArray());
		 	model.addAttribute("itemCategories", itemCategories.toArray());
		 	
		 
		 	return "editAccountPassPage";
	 }
	   
	 //Commits password change
	   @PostMapping("/pizzaStore/finishPasswordChange")
		 public String editUsersPassword(HttpSession session,
				@RequestParam("userEmail") String userEmail,
				@RequestParam("oldPassword") String oldPassword,
				@RequestParam("password") String password) {
		
		
		
		  // Save the user account to your database
		  //If password matches saved password.
		  if(ManageUsers.checkIfPasswordsMatch(userEmail, oldPassword)) {
		 	 //If there was an error updating users password.
		 	 if(!ManageUsers.editUserPassword(userEmail, password)) {
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
	
	 //Commits sign up.
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
			 	
			 	//Commits item deletion
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
				    		@RequestParam("itemPrices") String itemPrices,
				    		@RequestParam(name = "itemSizes", required = false) String itemSizes,
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
						 	Item item = CreateNewMenuItem.CreateItem(itemCategories, itemName, categoryName, itemPrices, itemSizes,itemDescription, mainToppingsName,
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
						 	if(!CreateNewMenuItem.addItemToDatabase(item, jpgFile, false, "")) {
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
						 	@RequestParam("oldItemName") String oldItemName,
						 	@RequestParam("itemName") String itemName,
				    		@RequestParam("categoryName") String categoryName, 
				    		@RequestParam("itemPrices") String itemPrices,
				    		@RequestParam(name = "itemSizes", required = false) String itemSizes,
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
						 	Item item = CreateNewMenuItem.CreateItem(itemCategories, itemName, categoryName, itemPrices, itemSizes, itemDescription, mainToppingsName,
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
						 	Item menuItem = MenuItems.getItemFromMenu(oldItemName, categoryName);
						 	
						 	//If there was an error getting item from menu.
						 	if(menuItem.getItemName() == null || menuItem.getItemName().isEmpty()) {
						 		//Redirect to home and show popup error.
						 		return "redirect:/?showError=Item not found. Could not be edited. Try again.";
						 	}
						 	
						 	boolean oldItemHasImage = menuItem.getHasImage();
						 	//Remove old Item
						 	MenuItems.removeItemFromMenu(oldItemName, categoryName);
						 	
						 	//Add updated item to menu
						 	if(!CreateNewMenuItem.addItemToDatabase(item, jpgFile, oldItemHasImage, oldItemName)) {
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
			 
			 
				 
				//Page where an admin can edit user permissions and delete users. 
				 @RequestMapping({"/pizzaStore/admin/edit/AllUsers"})
				    public String adminEditAllUsers(HttpSession session, Model model) {
					 	
					 	UserAccount user = (UserAccount) session.getAttribute("user");
					 	//Check if user is signed in and is an admin.
					    if (user != null && user.isAdmin()) {
					    	// User is an admin
					    	
					    	List<Item> menuItems = MenuItems.getMenuItemsList();
						 	//Check if the user is an admin
						 	
						 	setSessionAttributes(session, model);
						 	
						 	List<UserAccount> users = ManageUsers.getAllUsers();
						 	if(users == null) {
						 		return "redirect:/pizzaStore/admin/optionsPage?itemCreationError=Error gettings users from database.";
						 	}
						 	
						 	
						 	model.addAttribute("users", users);
						 	
						 	model.addAttribute("itemCategories", itemCategories.toArray());
						 	model.addAttribute("menuItems", menuItems.toArray());
					    } 
					    else {
						 	// User is not an admin
					    	return "redirect:/?showError=You are not an admin. You do not have permission to go here.";
					    }
					 	
					 	
					 
					 	
				        return "admin/adminEditAllUsersPage";
				    }
				 
				 //Commits change to edit user admin permissions. Give admin
				 @RequestMapping({"/pizzaStore/giveAdmin/email/{email}"})
				    public String adminGiveUserAdmin(HttpSession session, @PathVariable("email") String email) {
					 	
					 	UserAccount user = (UserAccount) session.getAttribute("user");
					 	//Check if user is signed in and is an admin.
					    if (user != null && user.isAdmin()) {
					    	
						 	//Give user admin
					    	if(!ManageUsers.setUserAdminPermission(email, true)) {
					    		return "redirect:/pizzaStore/admin/optionsPage?itemCreationError=Error giving admin.";
					    	}
						 	
					    } 
					    else {
						 	// User is not an admin
					    	return "redirect:/?showError=You are not an admin. You do not have permission to go here.";
					    }
					 	
					 	
					 
					    
				        return "redirect:/pizzaStore/admin/edit/AllUsers";
				    }
				 
				 //Commits change to edit user admin permissions. Remove admin
				 @RequestMapping({"/pizzaStore/removeAdmin/email/{email}"})
				    public String adminRemoveUserAdmin(HttpSession session, @PathVariable("email") String email) {
					 	
					 	UserAccount user = (UserAccount) session.getAttribute("user");
					 	//Check if user is signed in and is an admin.
					    if (user != null && user.isAdmin()) {
					    	
						 	//Remove user admin
					    	if(!ManageUsers.setUserAdminPermission(email, false)) {
					    		return "redirect:/pizzaStore/admin/optionsPage?itemCreationError=Error removing admin.";
					    	}
						 	
					    } 
					    else {
						 	// User is not an admin
					    	return "redirect:/?showError=You are not an admin. You do not have permission to go here.";
					    }
					 	
					 	
					 
					    
				        return "redirect:/pizzaStore/admin/edit/AllUsers";
				    }
				 
				 //Commits change to delete a users account.
				 @RequestMapping({"/pizzaStore/deleteUser/email/{email}"})
				    public String adminDeleteUser(HttpSession session, @PathVariable("email") String email) {
					 	
					 	UserAccount user = (UserAccount) session.getAttribute("user");
					 	//Check if user is signed in and is an admin.
					    if (user != null && user.isAdmin()) {
					    	
						 	//Give user admin
					    	if(!ManageUsers.adminDeletesUser(email)) {
					    		return "redirect:/pizzaStore/admin/optionsPage?itemCreationError=Error deleting user.";
					    	}
						 	
					    } 
					    else {
						 	// User is not an admin
					    	return "redirect:/?showError=You are not an admin. You do not have permission to go here.";
					    }
					 	
					 	
					 
					    
				        return "redirect:/pizzaStore/admin/edit/AllUsers";
				    }
				    
				    
			 
}
