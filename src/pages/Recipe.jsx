import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

function Recipe() {
  const [recipe, setRecipe] = useState([]);
  const [active, setActive] = useState('instructions');

  let params = useParams();

  const getRecipe = async (id) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=62e71394456044a0b306518fab2e71c4`
    );
    const recipes = await data.json();
    setRecipe(recipes);
  };

  useEffect(() => {
    getRecipe();
  }, [params.name]);

  return (
    <div>
      <DetailWrapper>
        <div>
          <h1>{recipe.title}</h1>
          <img src={recipe.image} alt={recipe.title} />
        </div>
        <Info>
          <Button
            className={active === 'instructions' ? 'active' : ''}
            onClick={() => setActive('instructions')}>
            Instructions
          </Button>
          <Button
            className={active === 'ingredients' ? 'active' : ''}
            onClick={() => setActive('ingredients')}>
            Ingredients
          </Button>

          <div>
            <h3 dangerouslySetInnerHTML={{ __html: recipe.summary }}></h3>
            <h3 dangerouslySetInnerHTML={{ __html: recipe.instructions }}></h3>
          </div>
          {/* <ul>
            {recipe.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul> */}
        </Info>
      </DetailWrapper>
    </div>
  );
}

const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  h2 {
    margin-bottom: 2rem;
  }
  li {
    font-size: 1.2rem;
    line-height: 2rem;
  }
  ul {
    margin-top: 2rem;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid balck;
  margin-right: 2rem;
  font-weight: 600;
`;
const Info = styled.div`
  margin-left: 10rem;
`;

export default Recipe;
