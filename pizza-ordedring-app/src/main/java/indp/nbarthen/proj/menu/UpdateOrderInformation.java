package indp.nbarthen.proj.menu;



import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
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
import indp.nbarthen.proj.user.UserOrder;

public class UpdateOrderInformation {
	/* Updates order information before continue to payment information.
	 */
	public static UserOrder generateItemForCart(UserOrder order, String homeAddress, String aptNumber,
			String deliveryInstructions, String pickupAtStore, String asapOrLater, 
			String laterSelectedDate, String laterSelectedTime) 
	{
		
		//Update delivery information. Home Address, apartment.
	 	order.setHomeAddress(homeAddress);
	 	order.setAptNumber(aptNumber);
	 	
	 	//Check pickup / delivery
	 	//Order is for pickup
	 	if(pickupAtStore.contains("pickup")) {
	 		order.setDelivery(false);
		 	order.setDeliveryInstructions(deliveryInstructions);
	 	}
	 	//Order is delivery
	 	else {
	 		order.setDelivery(true);
		 	order.setDeliveryInstructions(deliveryInstructions);
	 	}
	 	
	 	//Check ASAP / later
	 	//Order is for asap
	 	if(asapOrLater.contains("asap")) {
	 		order.setAsap(true);
	 	}
	 	//Order is for a later time/date.
	 	else {
	 		order.setAsap(false);
		 	order.setLaterPickupDate(laterSelectedDate);
		 	order.setLaterPickupTime(laterSelectedTime);
	 	}
	 	
	 	//Set order placement time/date.
	 	// Get the current date and time in the EST time zone
	 	LocalDateTime now = LocalDateTime.now(ZoneId.of("America/New_York"));

	 	// Format the time as '7:25 pm'
	 	DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("h:mm a");
	 	String formattedTime = now.format(timeFormatter);

	 	// Format the date as 'Jan 26, 23'
	 	DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("MMM d, yy");
	 	String formattedDate = now.format(dateFormatter);
	 	
	 	order.setOrderDate(formattedDate);
	 	order.setOrderPlacementTime(formattedTime);
			
		
		
		
		return order;

		   
    }
	
	
	
	


	    
}
