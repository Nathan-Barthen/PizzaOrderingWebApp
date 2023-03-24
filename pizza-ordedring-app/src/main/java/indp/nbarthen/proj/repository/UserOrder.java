package indp.nbarthen.proj.repository;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

import java.util.List;
import java.util.Vector;

@Entity
public class UserOrder {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@OneToOne
	private UserAccount userAcc;
	
	
	
	private String apiError;
	
	public UserOrder(){
		UserAccount userAcc = new UserAccount();
		apiError = "";
	}


	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}

	public UserAccount getUserAccount() {
		return userAcc;
	}


	public void setUserAccount(UserAccount userAcc) {
		this.userAcc = userAcc;
	}


		public String getApiError() {
			return apiError;
		}


		public void setApiError(String apiError) {
			this.apiError = apiError;
		}

	    
}
