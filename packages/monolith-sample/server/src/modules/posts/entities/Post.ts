import type { BaseEntity } from "../../../common/BaseEntity";

export interface Post extends BaseEntity {
	text: string;
	createdBy: string;
}
