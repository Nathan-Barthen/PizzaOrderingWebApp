package indp.nbarthen.proj.repository;

import org.springframework.data.repository.CrudRepository;

import indp.nbarthen.proj.user.UserOrder;



public interface OrdersRepository extends CrudRepository<UserOrder, String> {}
