import { BigInt } from "@graphprotocol/graph-ts"
import {
  TicketsFacet,
  ApprovalForAll,
  TransferBatch,
  TransferSingle,
  URI
} from "../generated/TicketsFacet/TicketsFacet"

export function handleApprovalForAll(event: ApprovalForAll): void {
}

export function handleTransferBatch(event: TransferBatch): void {}

export function handleTransferSingle(event: TransferSingle): void {}

export function handleURI(event: URI): void {}
