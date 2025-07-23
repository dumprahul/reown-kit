'use client'

import { useReadContract } from 'wagmi'
import { abi } from '../abi'
import { ConnectButton } from "@/components/ConnectButton";
import { useSendTransaction } from 'wagmi'
import { parseEther } from 'viem'


export default function Contract() {

    const { data: hash, sendTransaction } = useSendTransaction();

    const { data: number, refetch } = useReadContract({
      abi,
      address: '0x21748a6a888ffa4eaEde7f73212da22e926C755B',
      functionName: 'getNumber',
    });

   async function sendTransactions(e: React.FormEvent<HTMLFormElement>) { 
    e.preventDefault() 
    const formData = new FormData(e.target as HTMLFormElement) 
    const to = formData.get('address') as `0x${string}` 
    const value = formData.get('value') as string 
    sendTransaction({ to, value: parseEther(value) })
  } 

    return (
        <div>
            <ConnectButton />
            <form onSubmit={sendTransactions}>
            <input name="address" placeholder="0xA0Cf…251e" required />
            <input name="value" placeholder="0.05" required />
            <button type="submit">Send</button>
            {hash && <div>Transaction Hash: {hash}</div>}
            </form>

            <button onClick={() => refetch()}>Get Number</button>
            <div>Number: {number?.toString?.() ?? 'N/A'}</div>
        </div>
        
    )
}