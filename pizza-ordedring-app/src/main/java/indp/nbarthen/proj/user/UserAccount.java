package indp.nbarthen.proj.user;

import java.util.List;

import org.springframework.security.crypto.bcrypt.BCrypt;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class UserAccount {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String address;
    private String apartmentNum;
    private String email;
    private String passwordHash;
    private boolean isGuest;
    private boolean isAdmin;
    
    @OneToMany(mappedBy = "userAcc", cascade = CascadeType.ALL)
    private List<UserOrder> orders;

    public UserAccount() {
    	this.firstName = "Guest";
    	this.isGuest = true;
    	
    	this.isAdmin= false; 
    }
    public UserAccount(String firstName, String lastName, String phoneNumber, String address, String apartmentNum, String email, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.apartmentNum = apartmentNum;
        this.email = email;
        this.isGuest = false;
        this.isAdmin= false; 
        this.passwordHash = BCrypt.hashpw(password, BCrypt.gensalt());
    }
    
    
    // Getters and Setters
    
    public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getApartmentNum() {
		return apartmentNum;
	}
	public void setApartmentNum(String apartmentNum) {
		this.apartmentNum = apartmentNum;
	}
	public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }
    
	public boolean isGuest() {
		return isGuest;
	}
	public void setGuest(boolean isGuest) {
		this.isGuest = isGuest;
	}
	public boolean isAdmin() {
		return isAdmin;
	}
	
	public void setAdmin(boolean isAdmin) {
		this.isAdmin = isAdmin;
	}
}

