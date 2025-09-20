
import { useQuery } from '@tanstack/react-query';
import { fetchProductsList } from './api';
import { useCallback } from 'react';

export const useFetchProductList = () => {

    const hook = useQuery({
    queryKey: ['products_list'],
    queryFn: fetchProductsList,
    });

    return {
        productList: hook.data,
        ...hook
    }

}

export const useCartAnimation = () => {
  const triggerAnimation = useCallback((startElementId: string) => {
    const cartIcon = document.getElementById('cart-icon');
    const startElement = document.getElementById(startElementId);

    if (!cartIcon || !startElement) return;

    const startRect = startElement.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    const flyingEl = document.createElement('div');
    flyingEl.classList.add('flying-item'); // Make sure this class is in your index.css

    // Set initial position
    flyingEl.style.left = `${startRect.left + startRect.width / 2}px`;
    flyingEl.style.top = `${startRect.top + startRect.height / 2}px`;
    flyingEl.style.width = '15px';
    flyingEl.style.height = '15px';
    
    document.body.appendChild(flyingEl);
    
    // Animate to final position
    setTimeout(() => {
      flyingEl.style.left = `${cartRect.left + cartRect.width / 2}px`;
      flyingEl.style.top = `${cartRect.top + cartRect.height / 2}px`;
      flyingEl.style.transform = 'scale(0)';
    }, 10);
    
    // Clean up after animation
    setTimeout(() => {
      flyingEl.remove();
    }, 700); // Must match your CSS transition duration
  }, []);

  return { triggerAnimation };
};