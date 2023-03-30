package indp.nbarthen.proj.repository;

import java.util.List;
import java.util.Vector;

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
	
	private Double itemDefaultCost;
	//Calculated: Items additional cost to be added to itemDefaultCost if additional toppings are added or 'Extra' is selected.
	private Double itemAdditionalCost;
	
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
		
	}
	
	public Item(String category, String itemName, String itemDesc, Double itemDefaultCost, 
			Double itemAdditionalCost, Vector<Topping> includedToppings, 
			Vector<Topping> additionalToppings, String itemAdditionalInstructions) 
	{	
		this.category = category;
		this.itemName = itemName;
		this.itemDesc = itemDesc;
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

	public Double getItemDefaultCost() {
		return itemDefaultCost;
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
	
	
}
