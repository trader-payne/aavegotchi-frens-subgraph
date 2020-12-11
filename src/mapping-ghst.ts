import {
    BigInt,
    Address
} from "@graphprotocol/graph-ts"
import {
    Transfer
} from "../generated/GHST/GHST"
import {
  StakingFacet
} from "../generated/StakingFacet/StakingFacet"
import { Fren } from "../generated/schema"

export function handleTransfer(event: Transfer): void {

    if (event.params._to.equals(Address.fromString('0x93eA6ec350Ace7473f7694D43dEC2726a515E31A'))) {
	// if receiver is the staking contract
	// always create a new entity to speedup
	let entity = new Fren(event.params._from.toHex())
	entity.user = event.params._from
	
	let contract = StakingFacet.bind(Address.fromString('0x4A271b59763D4D8A18fF55f1FAA286dE97317B15'))
	entity.ghst = contract.staked(event.params._from).value0 + event.params._amount
	entity.frens = contract.frens(event.params._from)
	
	entity.save()
    } else if (event.params._from.equals(Address.fromString('0x93eA6ec350Ace7473f7694D43dEC2726a515E31A'))) {
	// if sender is staking contract
	// always create a new entity to speedup
	let entity = new Fren(event.params._to.toHex())
	entity.user = event.params._to
	
	let contract = StakingFacet.bind(Address.fromString('0x4A271b59763D4D8A18fF55f1FAA286dE97317B15'))
	entity.ghst = contract.staked(event.params._to).value0 - event.params._amount
	entity.frens = contract.frens(event.params._to)

	entity.save()
    } else {
	// no transactions of interest for us
    }
}
