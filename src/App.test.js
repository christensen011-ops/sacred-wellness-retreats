import { render, screen, fireEvent, within } from '@testing-library/react';
import App from './App';

const goTo = path => { window.history.pushState({}, '', path); return render(<App />); };
const main = () => within(document.querySelector('main'));

beforeEach(() => {
  // Fixed "today" so the tests do not change as real dates pass.
  jest.useFakeTimers().setSystemTime(new Date('2026-11-24T12:00:00'));
  window.open = jest.fn();
});
afterEach(() => jest.useRealTimers());

test('home page lists the upcoming retreats', () => {
  goTo('/');
  expect(screen.getByText('Find Your Reset')).toBeInTheDocument();
  expect(main().getAllByText('Tulum Deep Immersion').length).toBeGreaterThan(0);
  expect(main().getAllByText('Tulum 3-Night Meditation Immersion').length).toBeGreaterThan(0);
  expect(main().queryByText(/Monterrey/)).toBeNull();
});

test('each page sets its own title and canonical link', () => {
  goTo('/retreat/12');
  expect(document.title).toBe('Tulum Deep Immersion · Feb 18–25, 2027 | Sacred Wellness Retreats');
  expect(document.querySelector('link[rel="canonical"]').href).toBe('https://sacredwellnessretreats.com/retreat/12');
});

test('Deep Immersion shows the approved prices and takes no payment', () => {
  goTo('/retreat/13');
  const page = document.querySelector('main').textContent;
  ['$890', '$1,150', '$1,340', '$1,740', '$1,690', '$2,190', '$225', '$290', '$335', '$435', '$425', '$550', 'Apr 8–13']
    .forEach(text => expect(page).toContain(text));
  expect(page).toContain('No payment is taken until the venue is confirmed.');
  expect(main().queryByText('Reserve Your Spot')).toBeNull();
  expect(main().queryByText('Book Now')).toBeNull();
  fireEvent.click(main().getAllByText('Reserve by Application')[0]);
  expect(window.location.pathname + window.location.search).toBe('/apply?retreat=13');
  expect(main().getByText('Length of Stay and Room')).toBeInTheDocument();
  expect(window.open).not.toHaveBeenCalled();
});

test('application-only retreats cannot be reached through checkout', () => {
  goTo('/booking/12');
  const page = document.querySelector('main').textContent;
  expect(page).not.toContain('Tulum Deep Immersion');
  expect(page).not.toContain('Tulum 3-Night Meditation Immersion');
});

test('December immersion shows its prices and the minimum group', () => {
  goTo('/retreat/15');
  const page = document.querySelector('main').textContent;
  ['Dec 10–13, 2026', '$690', '$890', 'minimum of 4 guests', 'secure payment link for the full price']
    .forEach(text => expect(page).toContain(text));
});

test('Houston workshop checkout uses the First Sphere link and records the date', () => {
  goTo('/booking/11');
  fireEvent.click(main().getByText('Continue →'));
  fireEvent.click(main().getByText('Continue →'));
  fireEvent.click(main().getByText(/Complete Booking/));
  expect(window.open).toHaveBeenCalledWith(
    'https://buy.stripe.com/4gM7sM3e5dWTfTAen84800k?client_reference_id=swr-11-2027-01-15', '_blank');
});

test('Ascension retreat is in March with its price unchanged', () => {
  goTo('/retreat/7');
  const page = document.querySelector('main').textContent;
  expect(page).toContain('Mar 4–10, 2027');
  expect(page).toContain('$450');
  expect(page).toContain('$150');
  expect(page).not.toContain('Jan 15');
});

test('a date that has passed cannot be reserved', () => {
  jest.setSystemTime(new Date('2026-12-05T12:00:00'));
  goTo('/retreat/10');
  expect(main().getAllByText('This date has passed.').length).toBeGreaterThan(0);
  expect(main().queryByText('Reserve Your Spot')).toBeNull();
});

test('terms page states the same refund rule as the retreat pages', () => {
  goTo('/terms');
  const page = document.querySelector('main').textContent;
  expect(page).toContain('60+ days before retreat start: full refund');
  expect(page).not.toContain('administrative fee');
});

test('new copy uses no plant-medicine language', () => {
  goTo('/retreat/12');
  expect(document.querySelector('main').textContent).not.toMatch(/plant medicine|sacred medicine|ayahuasca/i);
  document.body.innerHTML = '';
});
