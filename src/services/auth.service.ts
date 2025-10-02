import pb from "../config/pocketbase.js";
import { ClientResponseError } from "pocketbase";
//import type { AuthResponse, LoginResult } from "../types/auth/login.types.js";
import { RegisterParams } from "../types/auth/register.types.js";
import logger from "../utils/logger.js";



class AuthService {
  async login(identity: string, password: string) {
    try {
      const { token, record } = await pb.collection("users").authWithPassword(identity, password);
      return {
        id: record.id,
        name: record.name,
        email: record.email,
        status: record.status,
        username: record.username,
        document_type: record.document_type,
        document_number: record.document_number,
        token
      };
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  async register(datas: RegisterParams) {
    try {
      const user = await pb.collection("users").create({
        name: datas.name,
        email: datas.email,
        password: datas.password,
        passwordConfirm: datas.passwordConfirm
      });
      const accountNumber = await this.generateAccountNumber()
      const [account, profile] = await Promise.all([
        pb.collection('accounts').create({
            user: user.id,
            balance:0,
            account_number: accountNumber,
            currency: 'PYG',
            status: 'active',
            daily_limit: 5000000,
            month_limit: 10000000
          }),
          pb.collection('profiles').create({
            user: user.id,
            names:datas.name,
            last_names: datas.lastname,
            phone: datas.phone,
            document_number: datas.document_number
          })
      ]) 

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        verified: user.verified,
        account: account.account_number,
        phone: profile.phone
      };
    } catch (err) {
        if(err instanceof ClientResponseError){
            // Esto es lo que necesitas loguear en detalle para ver si hay un mensaje oculto
            logger.error(err.cause);
        }
        // ... resto del manejo del error
        throw err;
    }
  }


  async emailExists(email: string): Promise<boolean> {
    try {
      await pb.collection("users").getFirstListItem(`email="${email}"`);
      return true;
    } catch (err) {
      return false;
    }
  }

  private async generateAccountNumber(): Promise<string> {
    const timestamp = Date.now().toString().slice(-10);
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    const accountNumber = `${timestamp}${random}`;
    
    // Verificar que no exista
    try {
      await pb.collection("accounts").getFirstListItem(`account_number="${accountNumber}"`);
      // Si existe, generar otro
      return this.generateAccountNumber();
    } catch (err) {
      // No existe, podemos usarlo
      return accountNumber;
    }
  }
}

export default new AuthService();
