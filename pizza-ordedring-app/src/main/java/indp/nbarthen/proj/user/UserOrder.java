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
	
	
	
	//Cost / Price of order
	private double totalCost;
	private double taxPercentAsDecimal;
	
	//Items added from menu
	@OneToMany
	private List<Item> items;
	
	@ManyToOne
    @JoinColumn(name = "user_account_id")
    private UserAccount userAcc;
	
	
	
	public UserOrder(){
		//Initialize order to Guest
		this.userAcc = new UserAccount();
		
		this.items = new Vector<Item>();
		//Pennsylvania standard tax rate
		taxPercentAsDecimal = 0.06;
	}
	
	public UserOrder(UserAccount userAcc){
		//Initialize to a logged in Account
		this.userAcc = userAcc;
		
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

	public boolean isDelivery() {
		return isDelivery;
	}

	public void setDelivery(boolean isDelivery) {
		this.isDelivery = isDelivery;
	}

	public boolean isAsap() {
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

	public UserAccount getUserAcc() {
		return userAcc;
	}

	public void setUserAcc(UserAccount userAcc) {
		this.userAcc = userAcc;
	}

	public UserAccount getUserAccount() {
		return userAcc;
	}


	public void setUserAccount(UserAccount userAcc) {
		this.userAcc = userAcc;
	}



	    
}
