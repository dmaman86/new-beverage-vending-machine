#new beverage vending machine

In this project I make an api rest of a beverage machine.

I create some models:
1. beverage model (name, type, price)
2. model of machines (only has the location of the machine)
3.stock (there may be several machines but they may have the same products, but most likely they do not have the same amount)
4. shopping model -> here is the part that we unite all

We verify that the machine exists and that the product exists. Then we verify the payment methods.
If the user pays with money, we verify the amount and save how much money we received and how much we paid back.
If it is by credit card we keep the card number.
Before saving the transaction, we verify to have that drink in the stock.
If we have it, we update the stock on the machine and return transaction data.
If the drink is over we do not save and return the proper message.
