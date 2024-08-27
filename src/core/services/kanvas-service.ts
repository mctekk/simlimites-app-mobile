// Core
import { client, adminClient } from "core/kanvas_client";
import { handleCustomFields } from "utils";

export class KanvasService {

  /**
   * Retrieves user data from the server.
   * @returns {Promise<any>} A promise that resolves with the formatted user data.
   * @throws {Error} If there is an error fetching the user data.
   */
  async getUserData() {
    const withSocial = true;

    try {
      const response = await client.users.getUserData(withSocial);
      const formatResponse = handleCustomFields(response);
      return formatResponse;
    } catch (error) {
      console.log('Error:', error);
      throw new Error(`Error fetching user data: ${error}`);
    }
  }

  /**
   * Updates the user data for a given user ID.
   *
   * @param userId - The ID of the user to update.
   * @param values - The updated values for the user data.
   * @returns The formatted response after updating the user data.
   * @throws If there is an error updating the user data.
   */
  async updateUserData(userId: number, values: any) {
    const withSocial = true;

    try {
      const response = await client.users.updateUserData(
        userId,
        values,
        withSocial,
      );
      const formatResponse = handleCustomFields(response);
      return formatResponse;
    } catch (error) {
      console.log('Error:', error);
      throw new Error(`Error updating user data: ${error}`);
    }
  }

  /**
   * Retrieves user data from the server by user email.
   * @returns {Promise<any>} A promise that resolves with the formatted user data.
   * @throws {Error} If there is an error fetching the user data.
   */
  async getUserByEmail(email: string) {
    try {
      const response = await adminClient.app.users.getUserByEmail(email);
      return response;
    } catch (error) {
      console.log('Error:', error);
      throw new Error(`Error fetching user data: ${error}`);
    }
  }

  /**
   * Retrieves products data from the server.
   * 
   * @param productTypeId - The ID of the product type to retrieve.
   * @returns {Promise<any>} A promise that resolves with the products data.
   * @throws {Error} If there is an error fetching the products data.
   */
  async getProducts(productTypeId: number) {
    try {
      const products = await adminClient.inventory.getProduct({
        first: 10,
        page: 1,
        whereCondition: {
          column: 'IS_PUBLISHED',
          operator: 'EQ', 
          value: true,
          AND: [{ column: 'PRODUCTS_TYPES_ID', operator: 'EQ', value: productTypeId }]
        }, 
      });
      return products;
    } catch (error) {
      console.log('Error:', error);
      throw new Error(`Error fetching products data: ${error}`);
    }
  }

  /**
   * Retrieves products types data from the server.
   * @returns {Promise<any>} A promise that resolves with the product types data.
   * @throws {Error} If there is an error fetching the product types data.
   */
  async getProductTypes() {
    try {
      const productTypes = await client.inventory.getProductTypes();
      return productTypes;
    } catch (error) {
      console.log('Error:', error);
      throw new Error(`Error fetching product types data: ${error}`);
    }
  }

}

export default new KanvasService();
