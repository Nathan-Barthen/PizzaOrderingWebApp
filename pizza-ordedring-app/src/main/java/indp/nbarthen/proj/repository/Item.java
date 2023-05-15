package indp.nbarthen.proj.repository;

import java.util.List;
import java.util.Vector;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ibm.icu.text.DecimalFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Item {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	//Category the item belongs to. (e.g. Pizza, Sides, Wings...)
	//Item item category given is not in database, it will be assigned to 'Misc'
	private String category;
	private String itemName;
	
	private String itemDesc;
	private boolean hasImage;
	private String imageUrl;
	
	private Double itemDefaultCost;
	//Calculated: Items additional cost to be added to itemDefaultCost if additional toppings are added or 'Extra' is selected.
	private Double itemAdditionalCost;
	
	//The number of the item the user orders. 
	private int howMany;
	
	//Toppings included on item. (Ex. Pepperoni Pizza - Sauce, Cheese, Pepperoni)
	@OneToMany
	private List<Topping> includedToppings;
	
	//Toppings that can be added, but for an additional charge.
	@OneToMany
	private List<Topping> additionalToppings;
	
	//Text of additional cooking / preparations suggested by user.
	private String itemAdditionalInstructions;

	
	
	public Item() {
		this.includedToppings = new Vector<Topping>();
		this.additionalToppings = new Vector<Topping>();
		this.hasImage = false;
	}
	
	public Item(String category, String itemName, String itemDesc, boolean hasImage, Double itemDefaultCost, 
			Double itemAdditionalCost, Vector<Topping> includedToppings, 
			Vector<Topping> additionalToppings, String itemAdditionalInstructions) 
	{	
		this.category = category;
		this.itemName = itemName;
		this.itemDesc = itemDesc;
		this.hasImage = hasImage;
		this.itemDefaultCost = itemDefaultCost;
		this.itemAdditionalCost = itemAdditionalCost;
		this.includedToppings = includedToppings;
		this.additionalToppings = additionalToppings;
		this.itemAdditionalInstructions = itemAdditionalInstructions;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public String getItemDesc() {
		return itemDesc;
	}

	public void setItemDesc(String itemDesc) {
		this.itemDesc = itemDesc;
	}

	public boolean getHasImage() {
		return hasImage;
	}

	public void setHasImage(boolean hasImage) {
		this.hasImage = hasImage;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public Double getItemDefaultCost() {
		return itemDefaultCost;
	}
	
	@JsonIgnore
	public String getItemDefaultCostAsString() {
		//Returns a string to match the format of currency #.##. (and not something like 10.0)
		DecimalFormat df = new DecimalFormat("0.00");
		String formattedPrice = df.format(itemDefaultCost);
		return formattedPrice;

	}

	public void setItemDefaultCost(Double itemDefaultCost) {
		this.itemDefaultCost = itemDefaultCost;
	}

	public Double getItemAdditionalCost() {
		return itemAdditionalCost;
	}

	public void setItemAdditionalCost(Double itemAdditionalCost) {
		this.itemAdditionalCost = itemAdditionalCost;
	}

	public int getHowMany() {
		return howMany;
	}

	public void setHowMany(int howMany) {
		this.howMany = howMany;
	}

	public List<Topping> getIncludedToppings() {
		return includedToppings;
	}

	public void setIncludedToppings(List<Topping> includedToppings) {
		this.includedToppings = includedToppings;
	}

	public List<Topping> getAdditionalToppings() {
		return additionalToppings;
	}

	public void setAdditionalToppings(List<Topping> additionalToppings) {
		this.additionalToppings = additionalToppings;
	}

	public String getItemAdditionalInstructions() {
		return itemAdditionalInstructions;
	}

	public void setItemAdditionalInstructions(String itemAdditionalInstructions) {
		this.itemAdditionalInstructions = itemAdditionalInstructions;
	}
	
	@JsonIgnore
	public String getItemTotalCost() {
		double totalCost = itemDefaultCost + itemAdditionalCost;
		DecimalFormat decimalFormat = new DecimalFormat("0.00");
		String stringOfCost = decimalFormat.format(totalCost);
		return stringOfCost;
	}
	
	
	
}
