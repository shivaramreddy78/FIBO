from pydantic import BaseModel, Field
from typing import Optional
from uuid import UUID
from datetime import datetime

class FinancialProfileBase(BaseModel):
    monthly_income: float = Field(..., ge=0)
    monthly_expenses: float = Field(..., ge=0)
    savings: float = Field(..., ge=0)
    business_revenue: Optional[float] = Field(0.0, ge=0)

class FinancialProfileCreate(FinancialProfileBase):
    pass

class FinancialProfileResponse(FinancialProfileBase):
    id: UUID
    user_id: UUID
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
