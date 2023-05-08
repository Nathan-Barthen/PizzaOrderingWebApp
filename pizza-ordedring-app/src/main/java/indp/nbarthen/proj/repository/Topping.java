package indp.nbarthen.proj.repository;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Topping {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	/* Determines the selectors for the given topping.
	    toppingType = 'dropdown' - would contain a dropdown of possible options with 'Light', 'Normal', 'Extra' amounts.
			Ex. Sauce Type: 'Red Sauce', 'BBQ Sauce' ...
	    toppingType = 'default' - would just contain topping name with 'Light', 'Normal', 'Extra' amounts.
	*/
	private String toppingType;
	
	//Determines if there needs to be a selector to put toppings on 'Left', 'Whole', or 'Right' side of pizza.
	private Boolean isPizza;
	//Could be - 'Left', 'Whole', 'Right', or 'Not Pizza'
	private String sideOfPizza;
	//If topping is not included for item, but it can be added w/ an additional fee;
	private Boolean isAddon;
	
	private String toppingName;
	
	//Used if toppingType = 'dropdown'. List of selected options (Ex. Type of Sauce)
	private List<String> toppingOptions;
	private String selectedOption;
	
	//Default = 'Normal'. Could also be 'Light', 'Extra' or 'None' (topping was removed)
	private String selectedAmount;
	
	//If the user selects 'Extra' - additional cost added.
	private Double additionalCostExtra;
	//If the user selects 'Add' for a topping in 'Add-ons' - additional cost added.
	private Double additionalCostAddon;

	public Topping()
	{
		this.selectedOption = "";
		this.toppingType = "default";
		this.selectedAmount = "Normal";
	}
	

	public Topping(String toppingType, Boolean isPizza, Boolean isAddon, String toppingName, 
			List<String> toppingOptions, String selectedAmount, Double additionalCost,
			Double additionalCostAddon) 
	{
		this.toppingType = toppingType;
		this.isPizza = isPizza;
		this.isAddon = isAddon;
		this.toppingName = toppingName;
		this.toppingOptions = toppingOptions;
		this.selectedAmount = selectedAmount;
		this.additionalCostExtra = additionalCost;
		this.additionalCostAddon = additionalCostAddon;
	}


	public long getId() {
		return id;
	}


	public void setId(long id) {
		this.id = id;
	}


	public String getToppingType() {
		return toppingType;
	}


	public void setToppingType(String toppingType) {
		this.toppingType = toppingType;
	}


	public Boolean getIsPizza() {
		return isPizza;
	}


	public void setIsPizza(Boolean isPizza) {
		this.isPizza = isPizza;
	}


	public String getSideOfPizza() {
		return sideOfPizza;
	}


	public void setSideOfPizza(String sideOfPizza) {
		this.sideOfPizza = sideOfPizza;
	}


	public Boolean getIsAddon() {
		return isAddon;
	}


	public void setIsAddon(Boolean isAddon) {
		this.isAddon = isAddon;
	}


	public String getToppingName() {
		return toppingName;
	}


	public void setToppingName(String toppingName) {
		this.toppingName = toppingName;
	}


	public List<String> getToppingOptions() {
		return toppingOptions;
	}


	public void setToppingOptions(List<String> toppingOptions) {
		this.toppingOptions = toppingOptions;
	}


	public String getSelectedOption() {
		return selectedOption;
	}


	public void setSelectedOption(String selectedOption) {
		this.selectedOption = selectedOption;
	}


	public String getSelectedAmount() {
		return selectedAmount;
	}


	public void setSelectedAmount(String selectedAmount) {
		this.selectedAmount = selectedAmount;
	}

	public Double getAdditionalCostExtra() {
		return additionalCostExtra;
	}

	public void setAdditionalCostExtra(Double additionalCostExtra) {
		this.additionalCostExtra = additionalCostExtra;
	}
	
	public Double getAdditionalCostAddon() {
		return additionalCostAddon;
	}

	public void setAdditionalCostAddon(Double additionalCostAddon) {
		this.additionalCostAddon = additionalCostAddon;
	}


	
}
