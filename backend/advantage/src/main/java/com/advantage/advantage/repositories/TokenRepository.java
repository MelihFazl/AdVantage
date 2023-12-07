package com.advantage.advantage.repositories;

import com.advantage.advantage.models.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TokenRepository extends JpaRepository<Token, Long>
{
    public List<Token> findById(long id);
}

