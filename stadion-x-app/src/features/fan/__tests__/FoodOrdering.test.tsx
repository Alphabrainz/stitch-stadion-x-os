import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FoodOrdering } from '../FoodOrdering';
import { useToastStore } from '../../../store/useToastStore';
import { useStadionStore } from '../../../store/useStadionStore';

describe('FoodOrdering', () => {
  beforeEach(() => {
    useToastStore.setState({ toasts: [] });
    useStadionStore.setState({ orders: [] });
  });

  const renderFoodOrdering = () => render(<FoodOrdering />);

  it('renders menu items', () => {
    renderFoodOrdering();
    expect(screen.getByText('Stadium Classic Burger')).toBeInTheDocument();
    expect(screen.getByText('Golden Fries')).toBeInTheDocument();
    expect(screen.getByText('Craft Beer (Pint)')).toBeInTheDocument();
    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
  });

  it('adds items to cart and updates total', () => {
    renderFoodOrdering();
    const addBurgerBtns = screen.getAllByText('Add');
    
    // Click Add on first item (Burger - ₹450)
    fireEvent.click(addBurgerBtns[0]);
    expect(screen.queryByText('Your cart is empty.')).not.toBeInTheDocument();
    
    // Wait for cart to reflect
    expect(screen.getAllByText('₹450').length).toBeGreaterThan(0);
    
    // Add again
    fireEvent.click(addBurgerBtns[0]);
    // 2x 450 = 900
    expect(screen.getAllByText('₹900').length).toBeGreaterThan(0);

    const toasts = useToastStore.getState().toasts;
    expect(toasts.length).toBeGreaterThan(0);
  });

  it('handles checkout and adds order to tracker', () => {
    renderFoodOrdering();
    
    // Add item
    fireEvent.click(screen.getAllByText('Add')[0]);
    
    // Click checkout
    fireEvent.click(screen.getByText('Pay with Card'));
    
    // Cart should empty
    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
    
    // Order tracker should appear
    expect(screen.getByText('Drone Delivery Tracker')).toBeInTheDocument();
    
    const orders = useStadionStore.getState().orders;
    expect(orders.length).toBe(1);
    expect(orders[0].items[0].name).toBe('Stadium Classic Burger');
  });

  it('advances drone status via demo controls', () => {
    useStadionStore.getState().addOrder({ items: [{ name: 'Burger', qty: 1, price: 450 }], total: 450 });
    renderFoodOrdering();
    
    expect(screen.getByText('Cooking...')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('(Demo) Advance Drone Status'));
    expect(screen.getByText('Drone Inbound')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('(Demo) Advance Drone Status'));
    expect(screen.getByText('Delivered')).toBeInTheDocument();
  });
});
