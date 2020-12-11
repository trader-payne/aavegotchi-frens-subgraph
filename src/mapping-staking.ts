import { BigInt, Address } from "@graphprotocol/graph-ts"
import {
  StakingFacet,
  TransferBatch
} from "../generated/StakingFacet/StakingFacet"
import { TicketValue, Fren } from "../generated/schema"

export function handleTransferBatch(event: TransferBatch): void {
    if (event.params._from.equals(Address.fromString('0'))) {
	let frenId = event.params._to.toHex()
	let fren = Fren.load(frenId)
	
	if (fren == null) {
	    fren = new Fren(frenId)
	    fren.user = event.params._to
	    fren.ghst = BigInt.fromI32(0)
	    fren.frens = BigInt.fromI32(0)
	    fren.uniV2PoolToken = BigInt.fromI32(0)
	    fren.save()
	}
	
	let ticketIds = event.params._ids
	let ticketValues = event.params._values
	
	for (let i=0; i < ticketIds.length; i++) {
	    let ticketId = ticketIds[i];

	    let ticketValueId = `${frenId}-${id}`
	    let ticketValue = TicketValue.load(ticketValueId)

	    if (ticketValue == null) {
		ticketValue = new TicketValue(ticketValueId)
		ticketValue.value = BigInt.fromI32(0)
		ticketValue.fren = frenId
		ticketValue.ticketId = ticketId
	    }
	    
	    ticketValue.value += ticketValues[i]
	    ticketValue.save()
	}
    }    
}
