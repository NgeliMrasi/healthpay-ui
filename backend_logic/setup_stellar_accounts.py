import requests
from stellar_sdk import Keypair

def create_and_fund(name):
    # Generate a new random keypair
    kp = Keypair.random()
    print(f"--- {name} ---")
    print(f"Public Key: {kp.public_key}")
    print(f"Secret Key: {kp.secret_key}")
    
    # Fund the account using Friendbot (Testnet Faucet)
    print(f"Funding {name} on Testnet...")
    response = requests.get(f"https://friendbot.stellar.org?addr={kp.public_key}")
    if response.status_code == 200:
        print(f"Success! {name} is active.")
    else:
        print(f"Error funding {name}.")
    return kp

# Generate both accounts
issuer = create_and_fund("HealthCoin Issuer")
admin = create_and_fund("HealthPay Admin")

# Save keys for the bash script to use
with open("stellar_keys.env", "w") as f:
    f.write(f"ISSUER_PUBLIC={issuer.public_key}\n")
    f.write(f"ADMIN_PUBLIC={admin.public_key}\n")
    f.write(f"ADMIN_SECRET={admin.secret_key}\n")
