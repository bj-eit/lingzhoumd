﻿using Ling.Domains.Abstract;
using Ling.Domains.Entities;
using Ling.Domains.ResponseObject;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace Ling.Domains.Concrete
{
    public class RoleRepository : DBContext, IRoleRepository
    {
        public RoleRepository(IConfiguration iConfiguration) : base(iConfiguration)
        {

        }

        public ResponseObjectForAnything Delete(int pID)
        {
            throw new NotImplementedException();
        }

        public ResponseObjectForAnything Select(int pPageIndex = 1, int pPageSize = 20, string pSearchText = "", int pOrderColumn = 0, string pCurrentOrder = "asc")
        {
            throw new NotImplementedException();
        }

        public ResponseObjectForAnything SelectByID(int pID)
        {
            throw new NotImplementedException();
        }

        public int SelectTotalCount(string pSearchText = "")
        {
            throw new NotImplementedException();
        }

        public ResponseObjectForAnything Upsert(Role pEntity)
        {
            throw new NotImplementedException();
        }
    }
}
