import { BigInt, Address } from "@graphprotocol/graph-ts"
import {
  UniV2Pool,
  Approval,
  Burn,
  Mint,
  Swap,
  Sync,
  Transfer
} from "../generated/UniV2Pool/UniV2Pool"
import {
  StakingFacet
} from "../generated/StakingFacet/StakingFacet"
import { Fren } from "../generated/schema"

  // - contract.DOMAIN_SEPARATOR(...)
  // - contract.MINIMUM_LIQUIDITY(...)
  // - contract.PERMIT_TYPEHASH(...)
  // - contract.allowance(...)
  // - contract.approve(...)
  // - contract.balanceOf(...)
  // - contract.burn(...)
  // - contract.decimals(...)
  // - contract.factory(...)
  // - contract.getReserves(...)
  // - contract.kLast(...)
  // - contract.mint(...)
  // - contract.name(...)
  // - contract.nonces(...)
  // - contract.price0CumulativeLast(...)
  // - contract.price1CumulativeLast(...)
  // - contract.symbol(...)
  // - contract.token0(...)
  // - contract.token1(...)
  // - contract.totalSupply(...)
  // - contract.transfer(...)
  // - contract.transferFrom(...)

export function handleTransfer(event: Transfer): void {
    if (event.params.to.equals(Address.fromString('0x93eA6ec350Ace7473f7694D43dEC2726a515E31A'))) {
	// if receiver is the staking contract
	// always create a new entity to speedup
	let entity = new Fren(event.params.from.toHex())
	entity.user = event.params.from
	
	let contract = StakingFacet.bind(Address.fromString('0x4A271b59763D4D8A18fF55f1FAA286dE97317B15'))
	entity.uniV2PoolToken = contract.staked(event.params.from).value1 + event.params.value
	entity.frens = contract.frens(event.params.from)
	
	entity.save()
    } else if (event.params.from.equals(Address.fromString('0x93eA6ec350Ace7473f7694D43dEC2726a515E31A'))) {
	// if sender is staking contract
	// always create a new entity to speedup
	let entity = new Fren(event.params.to.toHex())
	entity.user = event.params.to
	
	let contract = StakingFacet.bind(Address.fromString('0x4A271b59763D4D8A18fF55f1FAA286dE97317B15'))
	entity.uniV2PoolToken = contract.staked(event.params.to).value1 - event.params.value
	entity.frens = contract.frens(event.params.to)

	entity.save()
    } else {
	// no transactions of interest for us
    }
}
