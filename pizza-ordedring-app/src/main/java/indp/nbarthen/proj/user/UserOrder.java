package indp.nbarthen.proj.user;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

import java.util.List;
import java.util.Vector;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ibm.icu.text.DecimalFormat;

import indp.nbarthen.proj.repository.Item;

@Entity
public class UserOrder {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	//Generic information
	private String orderDate;
	private String orderPlacementTime;
	private String storeName;
	private String storeLocation;
	private String storePhoneNumber;
	
	//Delivery/Pickup Information
	private boolean isDelivery;
	private boolean isAsap;
	//If order is not asap
	private String laterPickupDate;
	private String laterPickupTime;
	//If order is delivery. Text of optional delivery instructions written by the user.
	private String deliveryInstructions;
	private String homeAddress;
	private String aptNumber;
	
	//Information relating to users account.
	private String usersFirstName;
	private String usersLastName;
	private String usersPhoneNum;
	private String usersEmail;
	
	
	//Cost / Price of order
	private double totalCost;
	private double taxPercentAsDecimal;
	
	//Items added from menu
	@OneToMany
	private List<Item> items;
	
	
	
	
	
	public UserOrder(){
		
		this.items = new Vector<Item>();
		//Pennsylvania standard tax rate
		taxPercentAsDecimal = 0.06;
	}
	
	


	
	//Getters / Setters
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}

	public String getOrderDate() {
		return orderDate;
	}

	public void setOrderDate(String orderDate) {
		this.orderDate = orderDate;
	}

	public String getOrderPlacementTime() {
		return orderPlacementTime;
	}

	public void setOrderPlacementTime(String orderPlacementTime) {
		this.orderPlacementTime = orderPlacementTime;
	}

	public String getStoreName() {
		return storeName;
	}

	public void setStoreName(String storeName) {
		this.storeName = storeName;
	}

	public String getStoreLocation() {
		return storeLocation;
	}

	public void setStoreLocation(String storeLocation) {
		this.storeLocation = storeLocation;
	}

	public String getStorePhoneNumber() {
		return storePhoneNumber;
	}

	public void setStorePhoneNumber(String storePhoneNumber) {
		this.storePhoneNumber = storePhoneNumber;
	}

	public boolean getIsDelivery() {
		return isDelivery;
	}

	public void setDelivery(boolean isDelivery) {
		this.isDelivery = isDelivery;
	}

	public boolean getIsAsap() {
		return isAsap;
	}

	public void setAsap(boolean isAsap) {
		this.isAsap = isAsap;
	}

	public String getLaterPickupDate() {
		return laterPickupDate;
	}

	public void setLaterPickupDate(String laterPickupDate) {
		this.laterPickupDate = laterPickupDate;
	}

	public String getLaterPickupTime() {
		return laterPickupTime;
	}

	public void setLaterPickupTime(String laterPickupTime) {
		this.laterPickupTime = laterPickupTime;
	}

	public String getDeliveryInstructions() {
		return deliveryInstructions;
	}

	public void setDeliveryInstructions(String deliveryInstructions) {
		this.deliveryInstructions = deliveryInstructions;
	}

	public String getHomeAddress() {
		return homeAddress;
	}

	public void setHomeAddress(String homeAddress) {
		this.homeAddress = homeAddress;
	}

	public String getAptNumber() {
		return aptNumber;
	}

	public void setAptNumber(String aptNumber) {
		this.aptNumber = aptNumber;
	}

	public double getTotalCost() {
		return totalCost;
	}

	public void setTotalCost(double totalCost) {
		this.totalCost = totalCost;
	}

	public String getUsersFirstName() {
		return usersFirstName;
	}





	public void setUsersFirstName(String usersFirstName) {
		this.usersFirstName = usersFirstName;
	}





	public String getUsersLastName() {
		return usersLastName;
	}





	public void setUsersLastName(String usersLastName) {
		this.usersLastName = usersLastName;
	}





	public String getUsersPhoneNum() {
		return usersPhoneNum;
	}





	public void setUsersPhoneNum(String usersPhoneNum) {
		this.usersPhoneNum = usersPhoneNum;
	}





	public String getUsersEmail() {
		return usersEmail;
	}





	public void setUsersEmail(String usersEmail) {
		this.usersEmail = usersEmail;
	}





	public double getTaxPercentAsDecimal() {
		return taxPercentAsDecimal;
	}

	public void setTaxPercentAsDecimal(double taxPercentAsDecimal) {
		this.taxPercentAsDecimal = taxPercentAsDecimal;
	}

	public List<Item> getItems() {
		return items;
	}

	public void setItems(List<Item> items) {
		this.items = items;
	}

	

	@JsonIgnore
	public String getOrderTotalCost() {
		double totalOrderCost = 0;
		for(Item i : items) {
			totalOrderCost += (i.getSelectedCost() + i.getItemAdditionalCost()) * i.getHowMany();
		}
		DecimalFormat decimalFormat = new DecimalFormat("0.00");
		String stringOfCost = decimalFormat.format(totalOrderCost);
		return stringOfCost;
	}

	    
}
