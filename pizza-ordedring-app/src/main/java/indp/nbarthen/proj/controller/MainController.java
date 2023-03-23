package indp.nbarthen.proj.controller;



import indp.nbarthen.proj.repository.UserOrder;
import indp.nbarthen.proj.repository.OrdersRepository;
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

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.ibm.icu.text.SimpleDateFormat;



@Controller
public class MainController {
	private OrdersRepository ordersRepository;
	private String userSearchPopupError;
	
	public MainController(OrdersRepository  ordersRepository) {
		this.ordersRepository = ordersRepository;
		this.userSearchPopupError = "none";
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
	    public String categoryPage(@PathVariable("categoryName") String summonerName, Model model) {
		 
		 	
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
	 
}
