import exp from "constants";

let username = 'nieisteniejącyUser@testowy-x-kom.com'; //polish letters probably won't let to create an account or use. Better to use in negative scenarios/
let password = 'Has3Łko!'; //weak password
const api_auth_key = "jfsTOgOL23CN2G8Y"

/*
all above values for username, password, api_auth_key should be deleted from this file and setup
as environment variables
*/

describe('TEST SCENARIO', () => { // test should be named better, should suggest what test will do
   beforeEach(() => {
      console.log("przed testem") // do we need log before each? If so, better to log some useful things
   });

   it('TEST CASE 1', () => {  // instead of 'TEST CASE 1' should be name which will suggest what this test is about

         /*

      Starting: Use Node 14.21.2
      Cypress": "^11.2.0", 

      */
      // no need to keep info about Node& Cypress version
      
      let sku_of_product: number = 312323;  //value not used in code
      let prductName1: string = 'ASUS [E2E-AT] R500VD-SX573H i3';
      let PrductPrice1 : number = 100
      let prductName2 : string= 'Samsung [E2E-AT] 500GB M.2 PCIe NVMe 970 EVO Plus';
      let PrductPrice2 : number = 100
      let PrductName3 : string = 'Kingston 64GB DataTraveler 100 G3';
      let PrductPrice3 : number = 100;

      /* values should be named better eg. sku_of_product should suggest what exactly is kept there
        PrductPrice1 - should be productPrice
        instead of productPrice1, productPrice2 etc. there should be distinction between them as eg. firstProductFromTheList or similar
        all value could go to external file and in this file could be just called by name
      no need to keep define 3 values when we got the same about for all of them
      Those all strictly defined products can disappear from the page or be moved to some subpages, then tests will fail
      */

      let modalLayout: string = "[data-cy='add_to_basket_modal_layout']";

      cy.visit("https://www.fakesklepzadanierekrutacyjne.pl")
      cy.visit('https://www.fakesklepzadanierekrutacyjne.pl/logowanie');
      // better to go to /logowanie from the app, instead of going there by specific url. Users will not do it
      cy.wait(3000);


      // Sprawdzenie czy formularz logowania działa poprawnie

      //1. Podanie niepoprawnych danych
      cy.get('[data-cy="login_form"] input[name="login"]').type('password');
      cy.get('[data-cy="login_form"] input[name"password"]').type(username);
      cy.get('[data-cy="login_form"] button').contains('Zalguj').click();

      /*
      exact String 'password' will be loaded into login input. value password should be passed - similar like in one line below
      probably button won't be clicked - typo in 'Zalguj'
      */

   
      // Wyszukanie produktu, po nazwie, dodanie 3 różnych produktów do koszyka

      // 1 produkt

      /* Instead of putting explanation what test should do in comments, steps should be covered by:
       it('Search products by name and add 3 different products to the order', () => { })

      */
      cy.visit('https://www.fakesklepzadanierekrutacyjne.pl/');
      //each test opens the same page, so above line could go to beforeEach section
      cy.get('[data-cy="search_bar_row_wrapper"] input')
         .clear()
         .click()
         .fill(`${prductName1}[enter]`);
      cy.get('[data-cy="listing_container_wrapper"]')
         .find("[data-cy='product_title']")
         .first()
         .click();
         cy.intercept(GET, "**/baskets").as("basket_response")
         cy.contains('Dodaj do koszyka').filter(':visible').wait(3000).click().should('be.visible');
         cy.wait('basket_response').then((resp) => expect(resp.response.statusCode).to.be.above(200))

      cy.get("[data-cy="add_to_basket_modal_layout"]").should('have.visibility');
      // should('be.visible') is correct form.
      // "[data-cy="add_to_basket_modal_layout"]" wrong quotes, should be get('[data-cy="add_to_basket_modal_layout"]')
      cy.contains(modalLayout, 'Wróć do zakupów').click;

      // 2gi produkt
      cy.visit('https://www.fakesklepzadanierekrutacyjne.pl');
      cy.get('[data-cy="search_bar_row_wrapper"] input')
         .clear()
         .click()
         .fill(`${prductName2}[enter]`);
      cy.get('[data-cy="listing_container_wrapper"]')
         .find("[data-cy='product_title']")
         .first()
         .click();
      cy.intercept(GET, "**/baskets").as("basket_response")
      cy.contains('Dodaj do koszyka').filter(':visible').wait(3000).click().should('be.visible');
      cy.wait('basket_response').then((resp) => expect(resp.response.statusCode).to.be.above(200))
      cy.get("[data-cy="add_to_basket_modal_layout"]").should('have.visibility'); //should(be.visible) is correct
      cy.contains(modalLayout, 'Wróć do zakupów').click;

      // 3gi produkt
      
      cy.visit('https://www.fakesklepzadanierekrutacyjne.pl');
      cy.get('[data-cy="search_bar_row_wrapper"] input')
         .clear()
         .click()
         .fill(`${PrductName3}[enter]`);
      cy.get('[data-cy="listing_container_wrapper"]')
         .find("[data-cy='product_title']")
         .first()
         .click();
         cy.intercept(GET, "**/baskets").as("basket_response")
         cy.contains('Dodaj do koszyka').filter(':visible').wait(3000).click().should('be.visible');//avoid wait
         cy.wait('basket_response').then((resp) => expect(resp.response.statusCode).to.be.above(200))
      cy.get("[data-cy="add_to_basket_modal_layout"]").should('have.visibility'); //wrong quotes, should be 'be.visible'
      cy.contains(modalLayout, 'Wróć do zakupów').click;

         //  //1 produkt
         // cy.visit('https://www.fakesklepzadanierekrutacyjne.pl');
         // cy.get('[data-cy="search_bar_row_wrapper"] input').type(sku_of_product).click()
         // cy.contains('Dodaj do koszyka').filter(':visible').wait(3000).click().should('be.visible');
         // cy.get("[data-cy="add_to_basket_modal_layout"]").should('have.visibility');
         // cy.contains(modalLayout, 'Wróć do zakupów').click;

         /*
         if there is no needed code, should be deleted, not just commented
         */

      // spradzenie czy w koszyku jest odpowiednia ilość produktów

      cy.open('https://www.fakesklepzadanierekrutacyjne.pl/koszyk');
      cy.get('[data-cy="basket_item"]').should('be.visible');
      cy.get('[data-cy="basket_item"]').should('have.count', 4);

      cy.contains('[data-cy="product_name"]').invoke('text').each(text => {cy.wrap(text).should('be.visible')})
   
      const arrayOfPrices = [PrductPrice1, PrductPrice2, PrductName3]
      arrayOfPrices.forEach((productPrice) => {
         cy.contains("cena").each((price) => {
            cy.wrap(price).invoke('text').should('contain', productPrice)
         })
      })

      // Usuwanie 2 produktów z koszyka (2 pierwszych z listy)

      cy.get('[data-cy="basket_item"]').eq(1).filter("[data-cy=remove_button]").should('be.visible').click();
      cy.get('[data-cy="basket_item"]').eq(2).filter("[data-cy=remove_button]").should('be.visible').click();

      // Weryfikacja ze mozna kontynuować jako gość, ale przejście do formularza założenia konta
      cy.contains("button", "Przejdź do dostawy").click()
      cy.contains("Kontynuj jako gość").should('not.be.visible')
      cy.get("[data-cy='Załóż konto']")
      cy.window().then((win) => cy.wrap(win.location.href)).should('contain', 'https://www.fakesklepzadanierekrutacyjne.pl\rejestracja')
      //backslash use in url, slash should be used .../rejestracja
   });
});