package indp.nbarthen.proj.repository;

import org.springframework.security.crypto.bcrypt.BCrypt;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class UserAccount {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
    private String firstName;
    private String lastName;
    private String address;
    private String email;
    private String passwordHash;
    private boolean isAdmin;

    public UserAccount() {
    	firstName = "Guest";
    }
    public UserAccount(String firstName, String lastName, String address, String email, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.email = email;
        this.isAdmin= false; 
        this.passwordHash = BCrypt.hashpw(password, BCrypt.gensalt());
        	/*
				if (BCrypt.checkpw(inputPassword, hashedPassword)) {
				    //Executes if passwords match
				}
        	 */
    }

    // Getters and Setters
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
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
    
	public boolean isAdmin() {
		return isAdmin;
	}
	
	public void setAdmin(boolean isAdmin) {
		this.isAdmin = isAdmin;
	}
}

