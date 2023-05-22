package indp.nbarthen.proj.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Vector;
import java.util.stream.Collectors;

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
	
	//Cost of item depending on size. First index will be smallest size.
	private List<Double> itemDefaultCosts;
	//Sizes of item. First index will be smallest size.
	private List<String> itemSizes;
	
	private Double selectedCost;
	private String selectedSize;
	
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
	
	public Item(String category, String itemName, String itemDesc, boolean hasImage, List<Double> itemDefaultCost, List<String> itemSizes,
			Double itemAdditionalCost, Vector<Topping> includedToppings, 
			Vector<Topping> additionalToppings, String itemAdditionalInstructions) 
	{	
		this.category = category;
		this.itemName = itemName;
		this.itemDesc = itemDesc;
		this.hasImage = hasImage;
		this.itemDefaultCosts = itemDefaultCost;
		this.itemAdditionalCost = itemAdditionalCost;
		this.itemSizes = itemSizes;
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

	public List<Double> getItemDefaultCosts() {
		return itemDefaultCosts;
	}
	
	@JsonIgnore
	public String getItemDefaultCostsCommaSeperated() {
		//Returns a comma seperated string to match the format of currency #.##. (and not something like 10.0)
		List<String> itemDefaultCostsList = new ArrayList<>();;
		for(Double cost : itemDefaultCosts) {
			DecimalFormat df = new DecimalFormat("0.00");
			String formattedPrice = df.format(cost);
			itemDefaultCostsList.add(formattedPrice);
		}
		String commaSeparatedCosts = String.join(", ", itemDefaultCostsList);
		return commaSeparatedCosts;
	}
	@JsonIgnore
	public List<String> getItemDefaultCostsAsString() {
		//Returns a string to match the format of currency #.##. (and not something like 10.0)
		List<String> itemDefaultCostsString = new ArrayList();
		for(Double cost : itemDefaultCosts) {
			DecimalFormat df = new DecimalFormat("0.00");
			String formattedPrice = df.format(cost);
			itemDefaultCostsString.add(formattedPrice);
		}
		return itemDefaultCostsString;

	}

	public void setItemDefaultCosts(List<Double> itemDefaultCosts) {
		this.itemDefaultCosts = itemDefaultCosts;
	}
	
	public List<String> getItemSizes() {
		return itemSizes;
	}
	
	@JsonIgnore
	public String getItemSizesCommaSeperated() {
		//Returns a comma seperated string of sizes
		if(itemSizes == null) {
			return "";
		}
		String commaSeparatedSizes = String.join(", ", itemSizes);
		return commaSeparatedSizes;
	}
	
	@JsonIgnore
	public List<String> getItemSizesAsString() {
		//Returns a string to match the format of currency #.##. (and not something like 10.0)
		if(itemSizes == null) {
			return null;
		}
		List<String> itemSizesString = new ArrayList();
		for(String size: itemSizes) {
			itemSizesString.add(size);
		}
		return itemSizesString;

	}
	
	public void setItemSizes(List<String> itemSizes) {
		this.itemSizes = itemSizes;
	}
	

	public Double getSelectedCost() {
		return selectedCost;
	}

	public void setSelectedCost(Double selectedCost) {
		this.selectedCost = selectedCost;
	}

	public String getSelectedSize() {
		return selectedSize;
	}

	public void setSelectedSize(String selectedSize) {
		this.selectedSize = selectedSize;
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
		double totalCost = selectedCost + itemAdditionalCost;
		DecimalFormat decimalFormat = new DecimalFormat("0.00");
		String stringOfCost = decimalFormat.format(totalCost);
		return stringOfCost;
	}
	
	
	
}
